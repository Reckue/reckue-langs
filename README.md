# language-coach
Advanced plugin which processing web pages that you visit, markup words from your wordbook by levels in runtime and show you every unknown. Also contains built in wordbook app.

## How it works? 
As a it specialist i often have a necessity to read. But im not a native english-speaker, so i have a lot problems with getting an information if it wasnt translated on my language. In this case i need to use translators and try to present it in your mind. How many times i need to spend on `ctrl+c` + `ctrl+v` moves? Okey, but what if i have a familiar word, and what if i forget the start of a sentence when i was translate the end of this one? In such moments i just close the literature and go practice. So in the cause, my theoretical basis so deep bottom. 

When you practice you get info by yourself and its easily than boring cramming. So point of the app in the same principle. You remove all unnecessary and focuse your attention on one base purpose. When you reding word that you already added to your wordbook, but dont learn you pay your attention. Repeat it 5 times and you can remember this word in next time. Sooo... Move it to the next level group. And pay more attention cause this word already close to you. And after you can autimatic instantly skip word realizing its meaning, set it in a `good` group and dont pay attention anymore. Concentrate attention on new words! 

In addition.Two days ago i couldn't write this article))

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