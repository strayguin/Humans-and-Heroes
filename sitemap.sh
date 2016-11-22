#!/bin/bash

SITE_ROOT="$(pwd)"

LAST_INDENT=0
printname() {
	local indent="$1"

	local href="$(pwd)"
	if [ "$href" == "$SITE_ROOT" ]; then
		href="$2.html"
	else
		href="${href//$SITE_ROOT\//}/$2.html"
	fi

	if [ $indent -gt $LAST_INDENT ]; then
		echo "<ul>"
	else
		while [ "$indent" -lt "$((LAST_INDENT--))" ]; do
			echo "</ul>"
		done
	fi

	LAST_INDENT="$indent"

	echo "<li><a href="$href">$2</a></li>"
}

process_dir() {
	local level="$1"
	for file in *.html; do
		if [ -f "$file" -a "$file" != "index.html" ]; then
			printname "$level" "${file//.html/}"
		fi
	done
	for dir in *; do
		if [ -d "$dir" ]; then
			if [ -f "$dir/index.html" ]; then
				printname "$level" "$dir"
			fi
			pushd "$(pwd)/$dir" >/dev/null
			process_dir "$((level+1))"
			popd >/dev/null
		fi
	done
}

cat <<EOF > sitemap.html
<html>
<body>
<ul>
$(process_dir 0)
</ul>
</body>
</html>
EOF
