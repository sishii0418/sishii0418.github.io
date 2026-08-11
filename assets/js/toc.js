document.addEventListener('DOMContentLoaded', function () {
  var menu = document.getElementById('toc-menu');
  var content = document.querySelector('#main .page__content');
  if (!menu || !content) return;

  var headings = content.querySelectorAll('h1, h2, h3');
  if (!headings.length) return;

  var listStack = [menu];
  var currentLevel = 1;

  function createListItem(heading) {
    var item = document.createElement('li');
    var link = document.createElement('a');
    var level = parseInt(heading.tagName.substring(1), 10);
    link.href = '#' + heading.id;
    link.textContent = heading.textContent;
    link.className = 'toc__link toc__link--h' + level;
    item.appendChild(link);
    return item;
  }

  headings.forEach(function (heading) {
    if (!heading.id) return;

    var level = parseInt(heading.tagName.substring(1), 10);
    if (level < 1 || level > 3) return;

    while (currentLevel < level) {
      var parentList = listStack[listStack.length - 1];
      var lastItem = parentList.lastElementChild;
      if (!lastItem) {
        currentLevel = level;
        break;
      }
      var nestedList = lastItem.querySelector('ul');
      if (!nestedList) {
        nestedList = document.createElement('ul');
        lastItem.appendChild(nestedList);
      }
      listStack.push(nestedList);
      currentLevel += 1;
    }

    while (currentLevel > level) {
      listStack.pop();
      currentLevel -= 1;
    }

    listStack[listStack.length - 1].appendChild(createListItem(heading));
  });
});
