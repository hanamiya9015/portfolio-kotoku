document.addEventListener('DOMContentLoaded', function() {
        // 必要な要素を取得
        const toggleButton = document.getElementById('view-more-toggle');
        const moreText = document.getElementById('more-text-content');
        
        toggleButton.addEventListener('click', function(event) {
            event.preventDefault(); // ページ遷移を防ぐ
            
            // .show クラスを付け外しして、テキストの表示/非表示を切り替える
            moreText.classList.toggle('show');
            
            // .open クラスを付け外しして、ボタンの矢印の向きとテキストを切り替える
            toggleButton.classList.toggle('open');

            if (moreText.classList.contains('show')) {
                toggleButton.firstChild.nodeValue = 'close '; // 表示時は「close」に変更
            } else {
                toggleButton.firstChild.nodeValue = 'view more '; // 非表示時は「view more」に戻す
            }
        });
    });