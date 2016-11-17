package com.github.SkySpiral7.HumansAndHeroes;

import java.io.File;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.github.SkySpiral7.Java.util.FileIoUtil;
import empty.MyTools;

public class SiteMapCreator
{
   private static String previousLink;

   public static void generate()
   {
      final List<File> foldersToIgnore = Arrays.asList(new File("../.git"), new File("../java"),
            new File("../secret-origins/javascript"), new File("../secret-origins/xml"));
      final List<Path> filesToIgnore = Stream.of("index.html", "site-map.html",
            "powers/effects/shell power.html", "powers/effects/godhood/shell godhood power.html",
            "powers/effects/sample-powers/shell example power.html", "powers/effects/sample-powers/Features/shell feature.html")
                                             .map(input -> new File("../" + input).toPath().toAbsolutePath().normalize())
                                             .collect(Collectors.toList());
      final int rootPathOffset = Main.rootFolder.toPath().toAbsolutePath().normalize().toFile().getAbsolutePath().length() + 1;
      new LeafFirstFileWalker(foldersToIgnore, input ->
      {
         if (input.toString().endsWith(".html") && !filesToIgnore.contains(input))
         {
            final String link = input.toString().substring(rootPathOffset).replace("\\", "/");
            if (previousLink != null) printUnorderedListTags(link);

            int depth = MyTools.CountCharOccurrencesInString(link, '/');
            if (link.endsWith("index.html")) --depth;
            if (depth > 0) System.out.print("<li>");
            System.out.print("<a href=\"" + link + "\">");
            System.out.print(readTitle(input) + " (" + link + ")");
            System.out.print("</a>");
            if (depth == 0) System.out.println("<br />");
            else System.out.println("</li>");

            previousLink = link;
         }
      }).startWalking(Main.rootFolder);
      printUnorderedListTags("fake");
   }

   private static String readTitle(final Path input)
   {
      final String contents = FileIoUtil.readTextFile(input.toFile());
      final Matcher matcher = Pattern.compile("<title>(.+?) - Humans &amp; Heroes").matcher(contents);
      matcher.find();
      return matcher.group(1);
   }

   private static void printUnorderedListTags(final String destinationPath)
   {
      File destinationFile = new File("./" + destinationPath);
      if (destinationPath.endsWith("index.html"))
      {
         destinationFile = destinationFile.getParentFile();
      }
      File previousFile = new File("./" + previousLink);
      if (previousFile.toString().endsWith("index.html"))
      {
         previousFile = previousFile.getParentFile();
      }
      final String linkBetween = FileMover.linkBetween(previousFile, destinationFile);
      final String output = linkBetween.replaceAll("[^\\w./]", "").replaceFirst("/?[^/]*$", "").replaceAll("\\w+", "<ul>")
                                       .replace("/", "").replaceAll("\\.\\.", "</ul>");
      if (!output.isEmpty()) System.out.println(output);
   }

}
