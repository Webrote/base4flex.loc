/*=============
 * Site scripts
 ==============*/
var _window = $(window),
	windowWidth = _window.width(),
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

		if (this.length === 0) 
			return;

		$('#main').fullpage({
			sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE'],
			anchors: ['section-1', 'section-2', 'section-3'],
			menu: '#sidebar-menu',
			verticalCentered: false,
			navigation: true,
			navigationPosition: 'right',
			responsiveWidth: 601,
			responsiveHeight: 480,
			// scrollBar: true,
			// scrollOverflow:true,

			// afterLoad: function () {
			// 	fullpageInit = true;
			// },

			afterRender: function () {
				// console.log('after Render');
			},
			afterResize: function () {
				// console.log('resize');
				// $.fn.fullpage.reBuild();
			},
			onLeave: function (index, nextIndex, direction) {
				// console.log('On leave!', 'index: ', index, '; nextIndex: ',nextIndex, '; direction: ', direction);
				// if(nextIndex == 3){
				// 	return false;
				// }
			},
			afterLoad: function (anchorLink, index) {
				// console.log('after Load!', 'anchorLink: ', anchorLink, ', index: ', index);
			},

		});	

		_window.on('resize', function() {
			
			$.fn.fullpage.reBuild();
			
		});

	},

	__menuMainFPToggle: function () {
		$('.menu-toggle_js').click(function() {
			
			$(this).toggleClass('menu-visible');
			$('.header-fp__menu-wrap').toggleClass('menu-visible');
			$('.menu-sidebar-fp').toggleClass('menu-visible');
			$('#main').toggleClass('menu-visible');

		});
	},
};

site.init = function () {
	site.__pseudoSelect();
	site.__rangeInput();
	site.__fullPageInit.call( document.querySelector('#main') );
	site.__menuMainFPToggle();
};

$(function () {
	site.init();
});