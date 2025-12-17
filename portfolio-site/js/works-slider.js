document.addEventListener('DOMContentLoaded', () => {
const initHorizontalSlider = () => {
    // === DOM要素の取得 ===
    const sliderImages = document.querySelectorAll('.slider_image');
    const prevBtn = document.querySelector('.prev_btn');
    const nextBtn = document.querySelector('.next_btn');

    // 要素がない場合は処理を中断
    if (!sliderImages.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    /**
     * 指定インデックスの画像を表示
     * @param {number} index - 表示する画像のインデックス
     */
    const showImage = (index) => {
      sliderImages.forEach((img, i) => {
        if (i === index) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });
    };

    /**
     * 前の画像へ移動
     */
    const showPrevious = () => {
      currentIndex =
        currentIndex === 0 ? sliderImages.length - 1 : currentIndex - 1;
      showImage(currentIndex);
    };

    /**
     * 次の画像へ移動
     */
    const showNext = () => {
      currentIndex =
        currentIndex === sliderImages.length - 1 ? 0 : currentIndex + 1;
      showImage(currentIndex);
    };

    // === イベントリスナーの設定 ===
    prevBtn.addEventListener('click', showPrevious);
    nextBtn.addEventListener('click', showNext);

    // キーボード操作対応（←→キー）
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        showPrevious();
      } else if (e.key === 'ArrowRight') {
        showNext();
      }
    });
  };




  const initVerticalSlider = () => {
    // === DOM要素の取得 ===
    const sliderWrappers = document.querySelectorAll('.slider_image_wrapper');
    const prevBtn2 = document.querySelector('.prev_btn_2');
    const nextBtn2 = document.querySelector('.next_btn_2');

    // 要素がない場合は処理を中断
    if (!sliderWrappers.length || !prevBtn2 || !nextBtn2) return;

    let currentIndex = 0;

    /**
     * 指定インデックスの画像ラッパーを表示
     * @param {number} index - 表示する画像のインデックス
     */
    const showWrapper = (index) => {
      sliderWrappers.forEach((wrapper, i) => {
        if (i === index) {
          wrapper.classList.add('active');
          // スクロール位置をトップに戻す
          wrapper.scrollTop = 0;
        } else {
          wrapper.classList.remove('active');
        }
      });
    };

    /**
     * 前の画像へ移動
     */
    const showPrevious = () => {
      currentIndex =
        currentIndex === 0 ? sliderWrappers.length - 1 : currentIndex - 1;
      showWrapper(currentIndex);
    };

    /**
     * 次の画像へ移動
     */
    const showNext = () => {
      currentIndex =
        currentIndex === sliderWrappers.length - 1 ? 0 : currentIndex + 1;
      showWrapper(currentIndex);
    };

    // === イベントリスナーの設定 ===
    prevBtn2.addEventListener('click', showPrevious);
    nextBtn2.addEventListener('click', showNext);
  };

  // === スライダーの初期化 ===
  initHorizontalSlider();
  initVerticalSlider();
});
