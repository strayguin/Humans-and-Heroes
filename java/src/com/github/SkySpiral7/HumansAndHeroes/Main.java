package com.github.SkySpiral7.HumansAndHeroes;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.*;

import com.github.SkySpiral7.Java.pojo.FileGatherer;
import com.github.SkySpiral7.Java.util.FileIoUtil;
import empty.MyTools;

/**
 * Excuse the mess: I wrote this a long time ago.
 */
public class Main
{
   public static final File rootFolder = new File("..");

   public static void main(String[] args) throws Exception
   {
      FileMover.moveFile(new File("../powers/effects.html"), new File("../powers/effects/index.html"));
   }

   public static void writeToFiles()
   {
      File[] myFileArray = getAllHtmlFiles(rootFolder);
      for (int i = 0; i < myFileArray.length; i++)
      {
         String originalContents = FileIoUtil.readTextFile(myFileArray[i]);
         String newContents = originalContents;
         //String newContents = MyTools.StringLiteralReplaceFirst(originalContents, "<table style=\"margin: 50px\" cellspacing=\"0\" border=\"0\">", "<table
         // style=\"margin: 50px; border-spacing: 0px; border-width: 0px;\">");
         if (!newContents.equals(originalContents))
         {
            FileIoUtil.writeToFile(myFileArray[i], newContents);
            System.out.print("Changed: ");
         }
         else System.out.print("Same: ");
         System.out.println(myFileArray[i].getAbsolutePath());
      }
      System.out.println("Done.\r\n");
   }

   /**
    * Use this again when the html is cleaned up from all generated and css stuff
    */
   public static String lineMax(String contentsToChange)
   {
      Scanner scanner;
      String returnValue = "";
      scanner = new Scanner(contentsToChange);
      while (scanner.hasNextLine())
      {
         String line = scanner.nextLine();
         if (line.startsWith("<p>") || line.startsWith("<div style=\"padding:5px\">"))
         {
            while (line.length() > 120)
            {
               int lastSpaceIndex = line.lastIndexOf(' ', 120);
               if (lastSpaceIndex == -1) break;
               returnValue += line.substring(0, lastSpaceIndex) + "\r\n";
               line = line.substring(lastSpaceIndex + 1);
            }
         }
         returnValue += line + "\r\n";
      }
      scanner.close();
      return returnValue;
   }

   public static void searchForText(String searchingFor, boolean ignoreCase, boolean removeTags)
   {
      File[] myFileArray = getAllHtmlFiles(rootFolder);
      List<File> foundList = new ArrayList<>();
      List<File> remainingList = new ArrayList<>();
      if (ignoreCase) searchingFor = searchingFor.toLowerCase();
      for (int i = 0; i < myFileArray.length; i++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[i]);
         if (ignoreCase) contents = contents.toLowerCase();
         if (removeTags) contents = contents.replaceAll("<.*?>", "");
         if (contents.contains(searchingFor)) foundList.add(myFileArray[i]);
         else remainingList.add(myFileArray[i]);
      }
      System.out.println("Done.\r\n");
      if (foundList.size() == 0)
      {
         System.out.println("Not found.");
         return;
      }
      System.out.println("Results:");
      for (int i = 0; i < foundList.size(); i++)
      { System.out.println(foundList.get(i).getAbsolutePath()); }
      System.out.println("\nNot found in these files:");
      for (int i = 0; i < remainingList.size(); i++)
      { System.out.println(remainingList.get(i).getAbsolutePath()); }
   }

   public static void searchForRegex(String searchingFor)
   {
      File[] myFileArray = getAllHtmlFiles(rootFolder);
      List<File> results = new ArrayList<>();
      for (int i = 0; i < myFileArray.length; i++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[i]);
         if (MyTools.regexFoundInString(contents, searchingFor)) results.add(myFileArray[i]);
      }
      System.out.println("Done.\r\n");
      if (results.size() == 0)
      {
         System.out.println("Not found.");
         return;
      }
      System.out.println("Results:");
      for (int i = 0; i < results.size(); i++)
      { System.out.println(results.get(i).getAbsolutePath()); }
   }

   public static void searchForSymbols()
   {
      File[] myFileArray = getAllHtmlFiles(rootFolder);
      //		FileGatherer.Builder builder = new FileGatherer.Builder();
      //		builder.subFolderCriteria((File file)->{
      //			if(file.equals(new File("../.git"))) return false;
      //			if(file.equals(new File("../images"))) return false;
      //			return true;
      //		});
      //		builder.fileCriteria((File file)->{
      //			if(file.equals(new File("../themes/bg-pattern.gif"))) return false;
      //			if(file.equals(new File("../themes/bg-top.gif"))) return false;
      //			//if(file.equals(new File("../secret-origins/xml/Mewtwo.xml"))) return false;
      //			return true;
      //		});
      //		builder.rootFolder(rootFolder);
      //		File[] myFileArray = builder.build().search().toArray(new File[0]);
      Set<String> results = new HashSet<>();
      System.out.println("Searching...");
      for (int i = 0; i < myFileArray.length; i++)
      {
         int lineCount = 1, colCount = 0;
         String newContents = FileIoUtil.readTextFile(myFileArray[i], StandardCharsets.UTF_8);
         for (int j = 0; j < newContents.length(); j++)
         {
            if (newContents.charAt(j) == '\n')
            {
               lineCount++;
               colCount = 0;
            }
            else colCount++;
            if (newContents.charAt(j) == '\r' || newContents.charAt(j) == '\n') {}  //there's also \t but I want that to be flagged
            else if (newContents.charAt(j) > '~' || newContents.charAt(j) < ' ')
            {
               results.add(newContents.charAt(j) + " = " + newContents.codePointAt(j));
               System.out.println(
                     myFileArray[i].getAbsolutePath() + " on line " + lineCount + " column " + colCount + " (length " + j + ") has " + newContents.charAt(j)
                     + " = " + newContents.codePointAt(j));
            }
            if (newContents.charAt(j) == '\n' && newContents.charAt(j - 1) != '\r')
               System.out.println(myFileArray[i].getAbsolutePath() + " broken endline found on line " + lineCount + " (length " + j + ") has \\n alone");
            if (newContents.charAt(j) == '\r' && newContents.charAt(j + 1) != '\n')
               System.out.println(myFileArray[i].getAbsolutePath() + " broken endline found on line " + lineCount + " (length " + j + ") has \\r alone");
         }
      }
      System.out.println("Done.\r\n");
      if (results.size() == 0)
      {
         System.out.println("All 7 bit ASCII (and on the keyboard).");
         return;
      }
      System.out.println("Results:");
      for (String item : results) { System.out.println(item); }
   }

   public static File[] getAllHtmlFiles(File containingFolder)
   {
      return FileGatherer.searchForFiles(containingFolder, FileGatherer.Filters.acceptExtensions("html")).toArray(new File[0]);
   }
}
