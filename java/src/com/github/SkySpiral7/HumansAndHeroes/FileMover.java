package com.github.SkySpiral7.HumansAndHeroes;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.github.SkySpiral7.Java.util.FileIoUtil;
import empty.MyTools;

public class FileMover
{
   private static final File sideBar = new File("../themes/side bar.js");

   public static void moveFile(final File oldFile, final File newFile) throws IOException
   {
      for (final File currentFile : Main.getAllHtmlFiles(Main.rootFolder))
      {
         System.out.print("Looking at ");
         System.out.println(currentFile);
         if (currentFile.equals(oldFile)) updateAllMyLinks(currentFile, newFile);
         else updateSingleLink(currentFile, oldFile, newFile);
      }
      System.out.print("Looking at ");
      System.out.println(sideBar);
      updateSideBar(oldFile, newFile);
      try
      {
         //without this Files.move somehow failed with "file is in use"
         Thread.sleep(10);
      }
      catch (InterruptedException e)
      {
         throw new RuntimeException(e);
      }
      Files.move(oldFile.toPath(), newFile.toPath());
   }

   public static void updateSideBar(final File oldFile, final File newFile)
   {
      final String originalContents = FileIoUtil.readTextFile(sideBar);
      //need to reference a file inside root so that linkBetween can get the parent of it
      final File fakeFile = new File(Main.rootFolder + "/fake.txt");
      final String pathToOld = linkBetween(fakeFile, oldFile);
      final String pathToNew = linkBetween(fakeFile, newFile);
      final String newContents = MyTools.StringLiteralReplaceFirst(originalContents, pathToOld, pathToNew);
      FileIoUtil.writeToFile(sideBar, newContents);
   }

   public static void updateAllMyLinks(final File currentFile, final File newFile)
   {
      findAllLinks(currentFile).forEach(linkText ->
      {
         if (!MyTools.regexFoundInString(linkText, "^(?:src|href)=\"http"))
         {
            final Matcher matcher = Pattern.compile("^(?:src|href)=\"([^\"#?]+)").matcher(linkText);
            matcher.find();
            final String pathToOld = matcher.group(1);
            final File oldFile = Paths.get(currentFile.getParentFile().getAbsolutePath(), pathToOld).toFile();

            final String originalContents = FileIoUtil.readTextFile(currentFile);
            //can't use updateSingleLink because the pathToNew is different
            final String pathToNew = linkBetween(newFile, oldFile);
            //don't include the end " in order to allow # etc
            final String newContents = originalContents.replaceAll("(src|href)=\"" + pathToOld, "$1=\"" + pathToNew);
            FileIoUtil.writeToFile(currentFile, newContents);
         }
      });
   }

   public static void updateSingleLink(final File currentFile, final File oldFile, final File newFile)
   {
      final String originalContents = FileIoUtil.readTextFile(currentFile);
      final String pathToOld = linkBetween(currentFile, oldFile);
      final String pathToNew = linkBetween(currentFile, newFile);
      //don't include the end " in order to allow # etc
      final String newContents = originalContents.replaceAll("(src|href)=\"" + pathToOld, "$1=\"" + pathToNew);
      FileIoUtil.writeToFile(currentFile, newContents);
   }

   public static Set<String> findAllLinks(final File currentFile)
   {
      final String contents = FileIoUtil.readTextFile(currentFile);
      final Matcher matcher = Pattern.compile("(?:src|href)=\"[^\"]+?\"").matcher(contents);
      final Set<String> linkSet = new HashSet<>();
      while (matcher.find())
      {
         linkSet.add(matcher.group());
      }
      return linkSet;
   }

   public static String linkBetween(final File currentFile, final File destinationFile)
   {
      final Path currentFolder = currentFile.getParentFile().toPath().toAbsolutePath().normalize();
      final Path destinationFolder = destinationFile.getParentFile().toPath().toAbsolutePath().normalize();
      final Path relativePath = currentFolder.relativize(destinationFolder).resolve(destinationFile.getName());
      return relativePath.toString().replace('\\', '/');
   }

}