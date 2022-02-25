# Chrome extension.
## Interactive language-learning helper.
It's your vocabulary-book built-in any pages you visit. 

You can interactively add, edit and mark words. 

Marked words will take one of selected list of colors and turn into vocabulary card right in your browser!

## How it works? 
No more necessary to create vocabulary cards for learning language by you own. 

Just read complex documents, books or whatever you like. 

Click on words and add them into your wordbook.

Set your baseline familiarity with the word, start notice them more and move between levels when feel your knowledge.

Save time learning new words by making it automatic!

## Information.
The day is not far off when the application will be posted in google store. 

I often update it and working on usability, so that not only you, but me too should be able to enjoy learning languages.

Now I am working on an interface that would not require unnecessary gestures from a user.

Clicking on each word will show small popup window, where you will be able to add, edit and markup words.

## ~0.1.5-0.1.6 - preview
![](https://sun9-31.userapi.com/rIXe5gjImJUmVA2AIUShndTDDTXp_5mojL55Vg/5XZGeZK_Uso.jpg)

## 0.2.0 - Change list
- Redesigned popup menu (preparing to collections)
- Speeded up parser (become at least in 2 times faster)
- Added `instantly create terms button` on google translate page
- Fixed list of bugs
![](https://sun9-6.userapi.com/7N36ebXciQqlCgqGvYB9ThFMw_RNnD3yCWzalQ/sp3mE8Cowoc.jpg)
  
## 0.2.7 - Returned to development
- Add docs, comments and TODO's for start.js, move file to from `./parser` to `./scripts`

## 0.2.8 - 2.2.9
- Add docs and empty files (mocks and constants) to prepare for future refactor
- Impl new page parser script (without text parser and page builder scripts)

## 0.3.0 - Clean parser and original form builder
- Make text parser and page buildr scripts
- Increased the speed of algorithm execution
- Made the page build in its original form
- Used mock WORDBOOK and mocks.js file
- Off google translator script, that produce able to add words

## 0.3.1 - Critical parsing bugfix
- Fix images, video and other media parsing

## 0.3.6 - Migration to OOP
- Move all page files into classes. Except start.js and mocks.js
- Added popup words. It's can't change real data, but the front is done.
- Some small changes in mocks.js and other scripts.

## 0.3.8 - Fix Builder
- Builder doesn't break pseudo-element "before" anymore