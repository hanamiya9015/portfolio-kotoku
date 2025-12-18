/******* ローディング画面制御 *********/

$(function () {
  // ページ読み込み完了後、2秒待ってからローディング画面をフェードアウト
  var loadingScreen = $('#loading-screen');
  
  // 最低2秒間ローディング画面を表示
  setTimeout(function() {
    // bodyにloadedクラスを追加してアニメーション開始
    $('body').addClass('loaded');
    
    loadingScreen.addClass('fade-out');
    
    // フェードアウト完了後にDOM から削除（0.6秒後）
    setTimeout(function() {
      loadingScreen.remove();
    }, 600);
  }, 2000);
});

/******* スムーススクロール *********/

$(function () {
  /* #で始まるアンカーをクリックした場合に処理 */
  $('a[href^=#]').click(function () {
    /* スクロールの速度 */
    var speed = 1300; /*  ミリ秒 */
    /* アンカーの値取得 */
    var href = $(this).attr('href');
    /* 移動先を取得 */
    var target = $(href == '#' || href == '' ? 'html' : href);
    /* 移動先を数値で取得 */
    var position = target.offset().top;
    /* オフセット調整（ヘッダーの高さなどを考慮） */
    var offset = 150; /* ヘッダーの高さ分のオフセット */
    /* ページトップ(#)の場合はオフセットなし */
    if (href === '#' || href === '') {
      offset = 0;
    }
    position = position - offset;
    /* スムーススクロール */
    $('body,html').animate({ scrollTop: position }, speed, 'swing');
    return false; /* リターン・フォルス */
    /* aタグ自体のリンク機能を無効化 */
  });
});

/************* topbtn ***************/
$(function () {
  var topBtn = $('#page_top');
  topBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
});

/************* header fade ***************/
$(function () {
  var header = $('#home_header');
  header.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
      header.fadeIn();
    } else {
      header.fadeOut();
    }
  });
});

/************* gallery_btn ***************/
$(function () {
  $('.view_btn').on('click', function () {
    $(this).toggleClass('on-click');
    $(this).closest('.center').siblings('.hidden_wrapper').slideToggle(1000);
  });

  /************* gallery_モーダルウィンドウ ***************/

  let $galleryLinks; // 現在開いているグループの全 <a> 要素
  let currentIndex; // 現在表示中の画像のインデックス (グループ内)

  // ギャラリーの画像リンクをクリックした時の処理
  // #illustration および #photo の中の .contents a をすべて対象とする
  $('#illustration .contents a, #photo .contents a').on('click', function (e) {
    e.preventDefault(); // リンクのデフォルト動作（ページ遷移）を防ぐ

    // 1. クリックされた画像が属する「最も近い親」の .contents 内の <a> タグだけを取得
    $galleryLinks = $(this).closest('.contents').find('a');

    // 2. クリックされた画像の、グループ内でのインデックスを取得
    currentIndex = $galleryLinks.index(this);

    // 3. モーダルに画像を表示
    showModal(currentIndex);

    // 4. ナビゲーションボタンの表示/非表示 (画像が1枚だけなら非表示)
    if ($galleryLinks.length > 1) {
      $('#modal-nav').show();
    } else {
      $('#modal-nav').hide();
    }
  });

  // モーダルを表示・更新する関数
  function showModal(index) {
    // インデックスが範囲外になったらループさせる
    if (index < 0) {
      index = $galleryLinks.length - 1; // 最後に飛ぶ
    } else if (index >= $galleryLinks.length) {
      index = 0; // 最初に戻る
    }

    // 現在のインデックスを更新
    currentIndex = index;

    // (★重要★) 該当するリンク要素の 'data-modal-src' 属性から画像パスを取得
    let imageUrl = $galleryLinks.eq(currentIndex).data('modal-src');

    // data-modal-src が設定されていなければ、念のため img の src を使う
    if (!imageUrl) {
      imageUrl = $galleryLinks.eq(currentIndex).find('img').attr('src');
    }

    // モーダルの画像を設定
    $('#modal-image').attr('src', imageUrl);

    // モーダルとオーバーレイをフェードイン表示
    $('#modal-overlay, #modal-window').fadeIn();
  }

  // 閉じる関数
  function closeModal() {
    $('#modal-overlay, #modal-window').fadeOut();
  }

  // 閉じるボタンをクリック
  $('#modal-close-btn').on('click', function () {
    closeModal();
  });

  // オーバーレイをクリック
  $('#modal-overlay').on('click', function () {
    closeModal();
  });

  // 「前へ」ボタンをクリック
  $('#modal-prev-btn').on('click', function () {
    showModal(currentIndex - 1);
  });

  // 「次へ」ボタンをクリック
  $('#modal-next-btn').on('click', function () {
    showModal(currentIndex + 1);
  });

  // キーボード操作
  $(document).on('keydown', function (e) {
    if ($('#modal-window').is(':visible')) {
      // 矢印キーでの切り替え
      if ($('#modal-nav').is(':visible')) {
        if (e.key === 'ArrowLeft') {
          $('#modal-prev-btn').click();
        } else if (e.key === 'ArrowRight') {
          $('#modal-next-btn').click();
        }
      }
      // Escキーでのクローズ
      if (e.key === 'Escape') {
        closeModal();
      }
    }
  });
}); // $(function() の閉じタグ

/************* 円形回転テキスト（スクロールボタン） ***************/
document.addEventListener('DOMContentLoaded', () => {
  const circleText = document.querySelector('.circle-text_02');
  if (circleText) {
    const text = 'SCROLL DOWN · ';
    const repeatedText = text.repeat(2);
    const totalChars = repeatedText.length;
    const anglePerChar = 360 / totalChars;

    for (let i = 0; i < totalChars; i++) {
      const span = document.createElement('span');
      span.textContent = repeatedText[i];
      span.style.transform = `rotate(${i * anglePerChar}deg)`;
      circleText.appendChild(span);
    }
  }
});
