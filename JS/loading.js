function hideLoader() {
    // 隐藏加载动画// 显示网页内容
  //   setTimeout(function(){document.querySelector('.loader').classList.add('hide-loader');
  //     document.querySelector('#content').classList.remove('hide-loader');
  // },2000);
    setTimeout(function(){document.querySelector('.load-wrapp').classList.add('hide-loader');
      document.querySelector('#content').classList.remove('hide-loader');
      document.querySelector('#bg').classList.remove('bg');
  },2000);
}