git branch -D gh-pages &&
git checkout -b gh-pages &&
git filter-branch --subdirectory-filter ./public -f &&
git push origin gh-pages -f &&
git checkout master
