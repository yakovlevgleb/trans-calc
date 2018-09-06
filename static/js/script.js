$(document).ready(function() {
	$('select').styler({selectSmartPositioning: false, selectPlaceholder: ''});

	window.trans = {};

	window.trans.form = ({

		init: function() {

			var _th = this;

			$('.js-phone').inputmask("+7 (999) 999 - 99 - 99", {
				placeholder: ' ',
				showMaskOnHover: false,
				showMaskOnFocus: false
			});

			$('.js-input-mask').on('keydown', function(e) {
				var validArr = [46, 8, 9, 27, 13, 110, 190]
				if (validArr.indexOf(e.keyCode) !== -1 ||
				(e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
				(e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
				(e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
				(e.keyCode >= 35 && e.keyCode <= 39)) {
					return;
				}
				if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					e.preventDefault()
				}
			});

			$('.js-input-mask').on('keyup', function() {
				var _t = $(this);
				var val = _t.val().replace(/\s/g, '');
				var newVal = val.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
				_t.val(newVal);
			});

			$('.calculator-form form, .calculator-contact form').submit(function(e) {
				if (!_th.checkForm($(this))) {
					return false;
				}
			});
		},

		checkForm: function(form) {
			var checkResult = true;
			form.find('.warning').removeClass('warning');
			form.find('input, textarea, select').each(function() {
				if ($(this).data('req')) {
					switch ($(this).data('type')) {
						case 'checkbox':
							if (!$(this).is(':checked')) {
								$(this).siblings('label').addClass('warning');
								checkResult = false;
							}
							break;
						case 'mobile':
							if ($.trim($(this).val()).length < 22) {
								$(this).addClass('warning');
								checkResult = false;
							}
							break;
						case 'email':
							var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
							if (!re.test($(this).val())) {
								$(this).addClass('warning');
								checkResult = false;
							}
							break;
						case 'select':
							if (!$(this).parent().hasClass('changed')) {
								$(this).parent().addClass('warning');
								checkResult = false;
							}
							break;
						default:
							if ($.trim($(this).val()) === '') {
								$(this).addClass('warning');
								checkResult = false;
							}
							break;
					}
				}
			});
			return checkResult;
		}
	}).init();

});
