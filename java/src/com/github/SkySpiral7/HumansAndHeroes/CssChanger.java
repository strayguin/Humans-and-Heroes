package com.github.SkySpiral7.HumansAndHeroes;

import java.io.File;
import java.util.*;
import java.util.regex.Pattern;

import com.github.SkySpiral7.Java.util.FileIoUtil;
import empty.MyTools;

/**
 * Excuse the mess: I wrote this a long time ago.
 */
public class CssChanger
{
   private static final File cssFile = new File("../themes/solitudecherry.css");

   public static void detectAllStyle()
   {
      File[] myFileArray = Main.getAllHtmlFiles();
      Set<String> results = new HashSet<>();

      for (int fileIndex = 0; fileIndex < myFileArray.length; fileIndex++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[fileIndex]);
         //contents=contents.replaceAll("\\s+", "").toLowerCase();
         String[] splitContents = contents.split("style=");
         for (int i = 1; i < splitContents.length; i++)
         {
            //skipping the first because I am only interested in what comes after style=
            String styleContents;  //only exists for readability
            styleContents = splitContents[i].substring(1, splitContents[i].indexOf('"', 1));
            results.add(styleContents);
         }
      }
      System.out.println("Done.\r\n");
      if (results.isEmpty())
      {
         System.out.println("None found.");
         return;
      }
      System.out.println("Results:");
      List<String> sortedResults = new ArrayList<>(results);
      Collections.sort(sortedResults);
      for (String style : sortedResults)
      { System.out.println(style); }
   }

   public static void combineClasses()
   {
      File[] myFileArray = Main.getAllHtmlFiles();
      for (int fileIndex = 0; fileIndex < myFileArray.length; fileIndex++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[fileIndex]);
         String[] splitContents = contents.split("class=\"");
         StringBuilder strBuild = new StringBuilder();
         strBuild.append(splitContents[0]).append("class=\"");
         for (int i = 1; i < splitContents.length; i++)
         {
            String text = splitContents[i].substring(splitContents[i].indexOf('"') + 1);
            if (text.contains(">"))
            {
               strBuild.append(splitContents[i]);
               if (i < splitContents.length - 1) strBuild.append("class=\"");
            }
            else
            {
               strBuild.append(splitContents[i].substring(0, splitContents[i].indexOf('"')));
               strBuild.append(' ');
            }
         }
         System.out.println(myFileArray[fileIndex].getAbsolutePath());
         FileIoUtil.writeToFile(myFileArray[fileIndex], strBuild.toString());
      }
      System.out.println("Done.");
   }

   public static void replaceLongStyles()
   {
      File[] myFileArray = Main.getAllHtmlFiles();
      Set<String> styleSet = new HashSet<>();
      final int offset = 77;

      for (int fileIndex = 0; fileIndex < myFileArray.length; fileIndex++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[fileIndex]);
         //contents=contents.replaceAll("\\s+", "").toLowerCase();
         String[] splitContents = contents.split("style=");
         for (int i = 1; i < splitContents.length; i++)
         {
            //skipping the first because I am only interested in what comes after style=
            String styleContents;  //only exists for readability
            styleContents = splitContents[i].substring(1, splitContents[i].indexOf('"', 1));
            styleSet.add(styleContents);
         }
      }
      System.out.println("Found them.");
      if (styleSet.isEmpty())
      {
         System.out.println("None found.");
         return;
      }
      List<String> styleList = new ArrayList<>(styleSet);
      //shortest first
      Collections.sort(styleList, (a, b) -> a.length() - b.length());
      for (Iterator<String> iterator = styleList.iterator(); iterator.hasNext(); )
      {
         String style = iterator.next();
         if (!style.endsWith(";")) style += ";";
         if (MyTools.CountCharOccurrencesInString(style, ';') <= 3) iterator.remove();
      }
      System.out.println("Filtered them.");
      for (int i = 0; i < styleList.size(); i++)
      {
         String style = styleList.get(i);
         if (!style.endsWith(";")) style += ";";
         style = style.replaceAll("; *", ";\r\n    ").trim();
         style = "    " + style + "\r\n";
         style = style.replaceAll(": *", ": ");

         StringBuilder newClass = new StringBuilder();
         newClass.append("\r\n.generated-class-").append(i + offset).append(" {\r\n");
         newClass.append(style);
         newClass.append("}\r\n");
         FileIoUtil.appendToFile(cssFile, newClass.toString());
      }
      System.out.println("Done generating.");
      for (int fileIndex = 0; fileIndex < myFileArray.length; fileIndex++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[fileIndex]);
         StringBuilder strBuild;
         String findText, replaceText;
         for (int i = 0; i < styleList.size(); i++)
         {
            strBuild = new StringBuilder();
            strBuild.append("style=\"").append(styleList.get(i)).append('"');
            findText = strBuild.toString();

            strBuild = new StringBuilder();
            strBuild.append("class=\"generated-class-").append(i + offset).append('"');
            replaceText = strBuild.toString();
            contents = contents.replace(findText, replaceText);
         }
         FileIoUtil.writeToFile(myFileArray[fileIndex], contents);
         System.out.println(myFileArray[fileIndex].getAbsolutePath());
      }
      System.out.println("Done.");
   }

   public static void compareAllCss()
   {
      Set<String> allCssNames = getAllCssSelectors();

      if (allCssNames.isEmpty())
      {
         System.out.println("Error: Css not parsed.");
         return;
      }
      System.out.println("Done with css. Size: " + allCssNames.size());
      List<String> unusedCss = new ArrayList<>();
      int index = 0;
      for (String name : allCssNames)
      {
         index++;
         System.out.println("Searching: " + name + ". " + index + " / " + allCssNames.size());
         if (!searchHtmlForCss(name)) unusedCss.add(name);
      }

      if (unusedCss.isEmpty())
      {
         System.out.println("Got all them suckers");
         return;
      }
      System.out.println("Getting full names: " + unusedCss);
      Set<String> fullUnusedNames = getFullCssNames(unusedCss);
      System.out.println("Blotting out: " + fullUnusedNames);
      blotOutCss(fullUnusedNames);
      System.out.println("Done");
   }

   private static Set<String> getAllCssSelectors()
   {
      String cssFileText = FileIoUtil.readTextFile(cssFile);
      Set<String> allCssNames = new HashSet<>();
      cssFileText = MyTools.StringRegexReplaceAll(cssFileText, Pattern.compile("\\{.*?\\}", Pattern.DOTALL), "");
      //remove all text which also removes all hex colors (which would mess up finding id selectors)
      cssFileText = MyTools.StringRegexReplaceAll(cssFileText, Pattern.compile("/\\*.*?\\*/", Pattern.DOTALL), "");
      //remove all comments which may contain a dot (which would mess up finding class selectors)
      cssFileText = cssFileText.replace(".", " .");  //make sure all dots have a space before them
      cssFileText = cssFileText.replace("#", " #");  //ditto even though there are none like this
      String[] cssSplit = cssFileText.split("[^a-zA-Z0-9_.#-]");  //split by everything that isn't a name or class/id selector
      for (String splitItem : cssSplit)
      {
         if (splitItem.isEmpty()) continue;  //if there was multiple white space etc in a row
         if (splitItem.charAt(0) != '.' && splitItem.charAt(0) != '#') continue;  //not a class or id selector
         //remove all that don't start with a dot or hash (* isn't used without a class)
         allCssNames.add(splitItem.substring(1));  //chop off [.#]
      }
      return allCssNames;
   }

   private static boolean searchHtmlForCss(String cssName)
   {
      File[] myFileArray = Main.getAllHtmlFiles();
      Pattern cssPattern = Pattern.compile("(?:class|id)=\"(?:|[^\"]+ )\\Q" + cssName + "\\E(?:| [^\"]+)\"");
      for (int i = 0; i < myFileArray.length; i++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[i]);
         if (cssPattern.matcher(contents).find()) return true;
      }
      return false;
   }

   private static Set<String> getFullCssNames(Collection<String> cssNameList)
   {
      String cssFileText = FileIoUtil.readTextFile(cssFile);
      Set<String> fullCssNames = new HashSet<>();
      cssFileText = MyTools.StringRegexReplaceAll(cssFileText, Pattern.compile("\\{.*?\\}", Pattern.DOTALL), "\n");
      //remove all text which also removes all hex colors
      cssFileText = MyTools.StringRegexReplaceAll(cssFileText, Pattern.compile("/\\*.*?\\*/", Pattern.DOTALL), "");
      //remove comments
      String[] cssSplit = cssFileText.split("[,\r\n]");  //split by comma and endline
      for (String splitItem : cssSplit)
      {
         splitItem = splitItem.trim();
         if (splitItem.isEmpty()) continue;  //if there was multiple white space etc in a row
         for (String nameItem : cssNameList)
         {
            if (Pattern.compile("[.#]" + nameItem.trim() + "[^a-zA-Z0-9_-]").matcher(splitItem).find()
                || Pattern.compile("[.#]" + nameItem.trim() + '$').matcher(splitItem).find())
            {
               fullCssNames.add(splitItem);
               break;
            }
         }
      }
      return fullCssNames;
      //return Arrays.asList(fullCssNames.toArray(new String[0]));  //in order to return as a list
   }

   private static void blotOutCss(Collection<String> cssNameList)
   {
      String cssFileText = FileIoUtil.readTextFile(cssFile);
      for (String cssName : cssNameList)
      {
         cssFileText = MyTools.StringRegexReplaceAll(cssFileText, Pattern.compile("(, *|^)\\Q" + cssName + "\\E( *,| *\\{$)", Pattern.MULTILINE), "$1$2");
      }
      cssFileText = cssFileText.replaceAll(" *,+", ",");  //delete multi commas
      cssFileText = cssFileText.replaceAll(", *\\{", " {");  //delete trailing commas (including ones I added)
      cssFileText = MyTools.StringRegexReplaceAll(cssFileText, Pattern.compile("^ *,", Pattern.MULTILINE), "");
      //delete leading commas. also deletes ones I added
      Pattern emptyBlockPattern = Pattern.compile("\\}\\s*\\{.*?\\}", Pattern.DOTALL);
      while (emptyBlockPattern.matcher(cssFileText).find())
      { cssFileText = MyTools.StringRegexReplaceAll(cssFileText, emptyBlockPattern, "}"); }
      //delete empty blocks (not first). needs a loop because replacement is used for match
      cssFileText = MyTools.StringRegexReplaceFirst(cssFileText, Pattern.compile("\\*/\\s*\\{.*?\\}", Pattern.DOTALL), "*/");
      //delete first block if empty
      FileIoUtil.writeToFile(cssFile, cssFileText);
   }

}
