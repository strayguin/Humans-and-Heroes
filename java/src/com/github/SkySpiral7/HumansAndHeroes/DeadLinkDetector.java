package com.github.SkySpiral7.HumansAndHeroes;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import com.github.SkySpiral7.Java.util.FileIoUtil;
import empty.MyTools;

public class DeadLinkDetector
{
   private static final File sideBar = new File("../themes/side bar.js");

   public static void detect() throws IOException
   {
      for (final File currentFile : Main.getAllHtmlFiles(Main.rootFolder))
      {
         System.out.print("Looking at ");
         System.out.println(currentFile);
         readLinks(currentFile);
      }
      System.out.print("Looking at ");
      System.out.println(sideBar);
      readSideBar();
   }

   private static void readSideBar()
   {
      final String contents = FileIoUtil.readTextFile(sideBar);
      final Matcher matcher = Pattern.compile("\"link\":\"([^\"]+)\"").matcher(contents);
      while (matcher.find())
      {
         final String pathToFile = matcher.group(1);
         final File linkedFile = Paths.get(Main.rootFolder.getAbsolutePath(), pathToFile).toFile();
         if (!linkedFile.exists()) System.out.println("   Broken link to: " + pathToFile);
      }
   }

   private static void readLinks(final File currentFile)
   {
      findAllLocalLinks(currentFile).forEach(linkText ->
      {
         if (linkText.startsWith("href=\"#"))
         {
            final String contents = FileIoUtil.readTextFile(currentFile);
            final String anchor = linkText.replaceFirst("^href=\"#([^\"]+)\"$", "$1");
            if (!contents.contains("id=\"" + anchor + "\"")) System.out.println("   Broken link to: #" + anchor);
         }
         else
         {
            final String pathToFile = linkText.replaceFirst("^(?:src|href)=\"([^\"#?]+).*\"$", "$1");
            final File linkedFile = Paths.get(currentFile.getParentFile().getAbsolutePath(), pathToFile).toFile();
            if (!linkedFile.exists()) System.out.println("   Broken link to: " + pathToFile);
            else if (linkText.contains("#"))
            {
               final String contents = FileIoUtil.readTextFile(linkedFile);
               final String anchor = linkText.replaceFirst("^href=\"[^\"#]+#([^\"]+)\"$", "$1");
               if (!contents.contains("id=\"" + anchor + "\"")) System.out.println("   Broken link to: " + pathToFile + "#" + anchor);
            }
         }
      });
   }

   public static Set<String> findAllLinks(final File currentFile)
   {
      final String contents = FileIoUtil.readTextFile(currentFile);
      final Matcher matcher = Pattern.compile("(?:src|href)=\"[^\"]+\"").matcher(contents);
      final Set<String> linkSet = new HashSet<>();
      while (matcher.find())
      {
         linkSet.add(matcher.group());
      }
      return linkSet;
   }

   public static Set<String> findAllLocalLinks(final File currentFile)
   {
      return findAllLinks(currentFile).stream().filter(linkText ->
            !MyTools.regexFoundInString(linkText, "^(?:src|href)=\"(?:https?|mailto|javascript|data):")
      ).collect(Collectors.toSet());
   }

}
