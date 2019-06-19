#!/bin/bash

echo "Running deploy..."

SRC_URL='git@github.com:belayakomnata/belayakomnata.github.io.git'
TMP_PATH=.tmp
DIST_PATH=build

echo "Pushing version and tags..."

git push origin develop -q
git push --tags -q

echo "Builing layout..."

npm run build --silent

echo "Prepare for publishing layout..."

git clone $SRC_URL $TMP_PATH -q
pushd $TMP_PATH > /dev/null;
git checkout master -q
git rm -r ./ -q

echo "Copying new content of layout..."

cp -r ../$DIST_PATH/* ./
git add -A

echo "Publishing layout..."

read -p "Enter the message on commit: " COMMIT_TEXT

if [ -z "$COMMIT_TEXT" ]
then
    git commit -m "Update" -q 
else
    git commit -m "${COMMIT_TEXT}" -q 
fi

rm -rf $TMP_PATH

git push origin master -q

echo "Makeup cleaning up..."

popd > /dev/null

rm -rf $TMP_PATH

git clean -df