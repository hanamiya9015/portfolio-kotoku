document.addEventListener('DOMContentLoaded', () => {
 /**
  * 無限スクロールスライダーの初期化
  * @param {HTMLElement} track - スライダーのトラック要素
  * @param {number} speed - スクロール速度（px/秒）
  * @param {string} direction - スクロール方向（'left' or 'right'）
  */
 const initInfiniteSlider = (track, speed, direction) => {
   if (!track) return;


   const images = Array.from(track.children);
   if (images.length === 0) return;


   // 画像を複製して追加（シームレスなループのため）
   // 十分な数を複製して、画面幅に関わらずスムーズに
   const cloneCount = Math.ceil(window.innerWidth / 300) + images.length;
   for (let i = 0; i < cloneCount; i++) {
     const clone = images[i % images.length].cloneNode(true);
     track.appendChild(clone);
   }


   // 1つのセットの幅（元の画像枚数分）
   const getSetWidth = () => {
     const imageWidth = 300;
     const gap = 70;
     return images.length * (imageWidth + gap);
   };


   const setWidth = getSetWidth();


   // 初期位置を設定（右方向の場合は負の値から開始）
   let position = direction === 'right' ? -setWidth : 0;
   let isPaused = false;
   let animationFrameId;


   // トラックの全幅を計算
   const updateTrackWidth = () => {
     const allImages = Array.from(track.children);
     const imageWidth = 300; // 画像幅
     const gap = 70; // 画像間の間隔
     return allImages.length * (imageWidth + gap);
   };


   /**
    * アニメーションループ
    */
   const animate = () => {
     if (!isPaused) {
       // スクロール方向に応じて位置を更新
       if (direction === 'left') {
         // 左方向（負の方向）にスクロール
         position -= speed / 60; // 60fps想定
         // 1セット分スクロールしたらリセット
         if (position <= -setWidth) {
           position = 0;
         }
       } else {
         // 右方向（正の方向）にスクロール
         position += speed / 60;
         // 0に達したらリセット
         if (position >= 0) {
           position = -setWidth;
         }
       }


       track.style.transform = `translateX(${position}px)`;
     }


     animationFrameId = requestAnimationFrame(animate);
   };


   // ホバーで一時停止
   track.addEventListener('mouseenter', () => {
     isPaused = true;
   });


   track.addEventListener('mouseleave', () => {
     isPaused = false;
   });


   // アニメーション開始
   animate();


   // ウィンドウリサイズ時の対応
   let resizeTimer;
   window.addEventListener('resize', () => {
     clearTimeout(resizeTimer);
     resizeTimer = setTimeout(() => {
       // リサイズ後に追加の複製が必要か確認
       const trackWidth = updateTrackWidth();
       if (trackWidth < window.innerWidth * 2) {
         for (let i = 0; i < 5; i++) {
           const clone = images[i % images.length].cloneNode(true);
           track.appendChild(clone);
         }
       }
     }, 250);
   });


   // クリーンアップ用の関数を返す
   return () => {
     cancelAnimationFrame(animationFrameId);
   };
 };


 // === イラストトラックの初期化 ===
 const illustrationTrack = document.querySelector('.illustration_track');
 if (illustrationTrack) {
   // 左から右へ、速度2（px/秒）
   initInfiniteSlider(illustrationTrack, 60, 'right');
 }


 // === 写真トラックの初期化 ===
 const photoTrack = document.querySelector('.photo_track');
 if (photoTrack) {
   // 右から左へ、速度2（px/秒）
   initInfiniteSlider(photoTrack, 60, 'left');
 }
});
