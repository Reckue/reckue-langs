# Chrome extension.
## Vacabulary Assistant - Your personal vocabulary builder.

<div style="border: 1px #1e81c6 solid; border-radius: 10px; background: #acd1ff">

![img_2.png](img_2.png)

</div>

<p>
Vacabulary Assistant helps you build and organize your vocabulary while browsing any webpage. 

You can easily add, edit, and categorize words. Marked words will be highlighted in customizable colors and instantly transformed into interactive vocabulary cards!
</p>

#### How it works?

No need to manually create vocabulary cards anymore! <br>
Just read articles, books, or any web content. <br>
Click on words to save them in your personal wordbook. <br>

Track your progress, improve retention, and level up your vocabulary effortlessly.

Vacabulary Assistant automates the process, saving you time while enhancing your language-learning experience!

## Build guide

1. Download dependencies and initialize the npm project using `npm install`.

2. Build the extension using `npm run build`. This will generate two runnable files: <br>
   `page/page.ts` and `popup/popup.ts`.

3. Open your browser and navigate to `chrome://extensions/`.

4. Enable developer mode and load the unpacked extension from the directory containing `manifest.json`.

![img_1.png](img_1.png)

## Updates History:

#### ~0.1.5-0.1.6 - Preview
![](https://sun9-31.userapi.com/rIXe5gjImJUmVA2AIUShndTDDTXp_5mojL55Vg/5XZGeZK_Uso.jpg)

#### 0.2.0 - First working prototype
- Redesigned popup menu (preparing for collections)
- Optimized parsing speed (2x faster)
- Added instant word-saving button on Google Translate
- Fixed various bugs

#### 0.2.7 - Development resumed
- Added documentation, comments, and TODOs
- Moved `start.js` from `./parser` to `./scripts`

#### 0.3.0 - Improved parser and form builder
- Enhanced text parsing and page building
- Increased algorithm efficiency
- Implemented mock wordbook and `mocks.js`

#### 0.3.6 - Migration to OOP
- Refactored files into classes
- Added interactive popup words feature

#### 0.4.5 - Chrome popup window support

...and more improvements coming soon!