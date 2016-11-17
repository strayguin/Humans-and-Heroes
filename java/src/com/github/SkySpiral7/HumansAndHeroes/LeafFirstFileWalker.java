package com.github.SkySpiral7.HumansAndHeroes;

import java.io.File;
import java.nio.file.Path;
import java.util.*;
import java.util.function.Consumer;
import java.util.stream.Collectors;

public class LeafFirstFileWalker
{
   private final List<Path> foldersToIgnore;
   private final Consumer<Path> consumer;
   private final Comparator<File> fileComparator = (a, b) ->
   {
      final int aFirst = -1;
      final int bFirst = 1;
      //files first
      if (a.isFile() && !b.isFile()) return aFirst;
      if (!a.isFile() && b.isFile()) return bFirst;

      if (a.isDirectory() && b.isDirectory()) return b.compareTo(a);  //reverse order for folders

      //there can be only 1 index.html at a time
      if (a.getName().equals("index.html")) return aFirst;
      if (b.getName().equals("index.html")) return bFirst;

      return a.compareTo(b);
   };

   public LeafFirstFileWalker(final List<File> foldersToIgnore, final Consumer<Path> consumer)
   {
      //I had to make my own file walker because I need a different order than Files.walkFileTree allows
      this.foldersToIgnore = foldersToIgnore.stream().map(input -> input.toPath().toAbsolutePath().normalize())
                                            .collect(Collectors.toList());
      this.consumer = consumer;
   }

   public void startWalking(final File rootFolder)
   {
      final Deque<File> remaining = new ArrayDeque<>();
      remaining.add(rootFolder);
      while (!remaining.isEmpty())
      {
         final File thisFile = remaining.removeLast();
         final File[] myContainedFiles = thisFile.listFiles();
         Arrays.sort(myContainedFiles, fileComparator);
         for (final File childFile : myContainedFiles)
         {
            final Path childAsPath = childFile.toPath().toAbsolutePath().normalize();
            if (childFile.isDirectory() && !foldersToIgnore.contains(childAsPath)) remaining.addLast(childFile);
            else if (childFile.isFile()) consumer.accept(childAsPath);
         }
      }
   }

}
