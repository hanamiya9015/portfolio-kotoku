window.addEventListener('DOMContentLoaded', () => {
  // === 設定 ===
  const CONFIG = {
    // アイコン画像のパス
    images: [
      'img/flower_01.png',
      'img/flower_02.png',
      'img/flower_03.png',
      'img/flower_04.png',
    ],
    // アイコンのサイズ範囲（ピクセル）
    minSize: 100,
    maxSize: 300,
    // アイコン生成間隔（ミリ秒）
    interval: 1000,
    // アイコンの表示時間（ミリ秒）
    duration: 10000,
  };

  // === DOM要素の取得 ===
  const container = document.querySelector('.flower-container');
  if (!container) return; // コンテナがない場合は処理を中断

  /**
   * アイコン要素を生成して画面に追加
   */
  const createFallingIcon = () => {
    // span要素を作成
    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'petal';

    // ランダムに画像を選択
    const randomImage =
      CONFIG.images[Math.floor(Math.random() * CONFIG.images.length)];

    // img要素を作成
    const imgElement = document.createElement('img');
    imgElement.src = randomImage;
    imgElement.alt = 'flower icon';
    iconWrapper.appendChild(imgElement);

    // ランダムなサイズを設定
    const size =
      Math.random() * (CONFIG.maxSize - CONFIG.minSize + 1) + CONFIG.minSize;
    iconWrapper.style.width = `${size}px`;
    iconWrapper.style.height = `${size}px`;

    // ランダムな横位置を設定
    iconWrapper.style.left = `${Math.random() * window.innerWidth}px`;

    // DOMに追加
    container.appendChild(iconWrapper);

    // 一定時間後に要素を削除（メモリリーク防止）
    setTimeout(() => {
      iconWrapper.remove();
    }, CONFIG.duration);
  };

  // === アニメーション開始 ===
  // 定期的にアイコンを生成
  setInterval(createFallingIcon, CONFIG.interval);
});
