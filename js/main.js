'use strict';
/*=============
 * Site scripts
 ==============*/
var windowW = $(window).width(),
	openMenu = false;

var site = {

	__pseudoSelect: function () {

		// Расположение выпадашки (сверху или снизу)
		function isDropedDown(dropHeight, parentLocation) {
			return ($(window).height() > (parentLocation + dropHeight));
		}


		$('.js-pseudoselect').click(function(e) {
			e.preventDefault();

			if ($(this).hasClass('disabled')) {return false;}

			// Сохраняем элемент выпадающий список
			var _thisPseudo = $(this),
				dropBlock = _thisPseudo.parent().find('.js-drop');

			// высота выпадающего списка 
			// и расположение родителя + его высота
			var dropHeight = dropBlock.height(),
				parentLocation = _thisPseudo.get(0).getBoundingClientRect().top + _thisPseudo.height();

			_thisPseudo.toggleClass('active');


			// Если он скрыт, то сначала скрываем все открытые
			// затем открываем выбранный
			if (dropBlock.is(':hidden')) {

				$('.js-drop').each(function() {
					if ($(this).is(':visible')) {
						$(this).slideUp(100,function () {
							$(this).removeClass('dropdown dropup');
						})
					}
				});

				// если внизу хватает места- открываем вниз
				// иначе вверх
				if (isDropedDown(dropHeight, parentLocation)) {
					dropBlock.addClass('dropdown');
				} else {
					dropBlock.addClass('dropup');
				}

				dropBlock.slideDown(100);

				// удаляем обработчик, что бы не было дублирования срабатывания события
				dropBlock.off('click');
				// ОБрабатываем выбор элемента из выпадающего списка
				dropBlock.on('click','li',function() {

					console.log('click');

					var _this = $(this),
						selectResult = _this.text(),
						id = _this.data('id');


					_this.parent().find('.active').removeClass('active');
					_this.addClass('active');

					// сохраняем значение в скрытом input
					dropBlock.siblings('input').val(id).change();
					// показываем выбранное значение в видимое поле (js-pseudoselect)
					_thisPseudo.attr('title', selectResult).addClass('done').find('.pseudoselect__placer').html(selectResult);

					// скрываем список
					_thisPseudo.removeClass('active')
					dropBlock.slideUp(100, function () {
						$(this).removeClass('dropdown dropup');
					});
					return false;
				});
			} else {
				dropBlock.slideUp(100, function () {
					$(this).removeClass('dropdown dropup');
				});
			}
			return false;
		});
		// Для каждого псевдоселекта вытаскием значение и дублируем в title
		$('.js-pseudoselect').each(function(index, el) {
			$(this).attr('title', $(this).text());
		});
		// Скрываем все выпадающие списки при нажатии во вне

		// $('.js-pseudoselect').blur(function(event) {

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

	__pseudoSelectNew: function () {
		$('.js-pseudoselect').pSelect();
	},

	__rangeInput: function () {
		$('#example-range').change(function(event) {
			// console.log($(this).val());
		});
	},

	__fullPageInit: function () {
		$('#fullpage').fullpage({
			// anchors: ['pg-card', 'pg-about', 'pg-network', 'pg-contacts', 'pg-consult'],
			// menu: '#footer-menu',
			verticalCentered: false,
			navigation: true,
			navigationPosition: 'right',
			// scrollBar: true,
			// scrollOverflow:true,

			// afterLoad: function () {
			// 	fullpageInit = true;
			// },

		});	
	},
};

site.init = function () {
	site.__pseudoSelect();
	site.__rangeInput();
	site.__fullPageInit();
};

$(function () {
	site.init();
});