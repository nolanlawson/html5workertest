(function () {
  'use strict'

  var hasNavigated = false

  // only go back if the user has a state to go back to, i.e. they didn't start on
  // a URL like index.html#Safari
  function goBack() {
    if (hasNavigated) {
      history.back()
    } else { // go forward
      location.hash = ''
    }
  }

  // allow the user to press escape to dismiss the modal
  document.addEventListener('keydown', function (e) {
    if (e.keyCode == 27 && location.hash) { // escape
      goBack()
    }
  })

  // allow the user to click the close button to dismiss the modal
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('close-my-modal')) {
      goBack()
    } else if (location.hash) {
      // allow the user to click outside the modal to dismiss
      goBack()
    }
  })

  // allow the user to click outside the modal to dismiss
  var modals = document.querySelectorAll('.my-modal-dialog-inner')
  var i = -1
  while (++i < modals.length) {
    var modal = modals[i]
    modal.addEventListener('click', function (e) {
      if (!e.target.classList.contains('close-my-modal')) {
        e.stopPropagation()
      }
    })
  }

  // prevent body from scrolling when modal is shown
  function preventBodyScrolling() {
    document.body.style.overflowY = location.hash ? 'hidden' : 'scroll'
  }

  window.addEventListener('hashchange', function () {
    hasNavigated = true
    preventBodyScrolling()
  })
  preventBodyScrolling()

})()