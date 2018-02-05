(function ($) {
	$.fn.pSelect = function (options) {
		// Расположение выпадашки (сверху или снизу)
		function isDropedDown(dropHeight, parentLocation) {
			return ($(window).height() > (parentLocation + dropHeight));
		}

		// var default = {};
		// var sets = $.extend({},defaults,options);
		
		
		
		return this.each(function() {

			var thisPseudo = $(this),
				dropBlock = thisPseudo.parent().find('.js-drop'),

				// и расположение родителя + его высота
				dropHeight = dropBlock.height(), // высота выпадающего списка 
				parentLocation = thisPseudo.get(0).getBoundingClientRect().top + thisPseudo.height();

			// if (_thisPseudo.hasClass('disabled')) {return false;}
			// console.log(thisPseudo);

			var pSelect = {
				init: function () {
					pSelect.dropOptionClick();
					pSelect.selectClick();
					pSelect.selectBlur();
				},

				selectClick: function () {
					thisPseudo.click(function(e) {
						e.preventDefault();

						thisPseudo.toggleClass('active');

						// Если он скрыт, то сначала скрываем все открытые
						// затем открываем выбранный
						if (dropBlock.is(':hidden')) {
							// если внизу хватает места- открываем вниз
							// иначе вверх
							if (isDropedDown(dropHeight, parentLocation)) {
								dropBlock.addClass('dropdown');
							} else {
								dropBlock.addClass('dropup');
							}

							dropBlock.slideDown(100);


						} else {
							dropBlock.slideUp(100, function () {
								$(this).removeClass('dropdown dropup');
							});
						}

					});
				},

				selectBlur: function () {
					// thisPseudo.focusout(function() {

					// 	$(this).removeClass('active');
					// 	$(this).siblings('.js-drop').slideUp(100, function () {
					// 		$(this).removeClass('dropdown dropup');
					// 	});

					// });	
					$('body').click(function() {
						$('.js-drop').each(function() {
							if ($(this).is(':visible')) {
								$(this).siblings('.js-pseudoselect').removeClass('active');
								$(this).slideUp(100, function () {
									$(this).removeClass('dropdown dropup');
								});
							}
						});
					});
				},

				dropOptionClick: function () {
					dropBlock.on('click', 'li', function() {
						
						console.log('click');
						var _this = $(this),
							selectResult = _this.text(),
							id = _this.data('id');

						$('.active', dropBlock).removeClass('active');
						_this.addClass('active');

						// сохраняем значение в скрытом input
						dropBlock.siblings('input').val(id).change();
						// показываем выбранное значение в видимое поле (js-pseudoselect)
						thisPseudo.attr('title', selectResult).addClass('done').find('.pseudoselect__placer').html(selectResult);

						// скрываем список
						thisPseudo.removeClass('active')
						dropBlock.slideUp(100, function () {
							$(this).removeClass('dropdown dropup');
						});


					});
				},

			};

			pSelect.init();
		});
	}
}(jQuery));