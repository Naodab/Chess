function Validator(options) {
	function getParent(element, selector) {
		while (element.parentElement) {
			if (element.parentElement.matches(selector)) {
				return element.parentElement;
			}
			element = element.parentElement;
		}
	}

	function validate(inputElement, rule) {
		var errorMessage;
		for (var param of selectorRules[rule.selector]) {
			switch (inputElement.type) {
				case 'radio':
				case 'checkbox':
					errorMessage = param(
						formElement.querySelector(rule.selector + ':checked')
					);
					break;
				default:
					errorMessage = param(inputElement.value);
			}
			if (errorMessage) break;
		}

		var isValid = true;
		var parentElement = getParent(inputElement, options.formGroupSelector)
		if (errorMessage) {
			isValid = false;
			parentElement.classList.add('error');
		} else {
			errorMessage = "";
			parentElement.classList.remove('error');
		}
		parentElement.querySelector(options.errorSelector).innerText = errorMessage;
		return isValid;
	}

	var selectorRules = {};
	var formElement = document.querySelector(options.form);

	if (formElement) {
		formElement.onsubmit = event => {
			event.preventDefault();
			var isValid = true;
			if (typeof options.onSubmit === 'function') {
				options.rules.forEach(rule => {
					var inputElement = formElement.querySelector(rule.selector);
					var valid = validate(inputElement, rule);
					if (!valid) isValid = false;
				});
				if (isValid) {
					var enableInputs = formElement.querySelectorAll("[name]:not(disable)");
					var formValues = Array.from(enableInputs).reduce((value, input) => {
						switch (input.type) {
							case 'radio':
								if (input.checked) value[input.name] = input.value;
								break;
							case 'checkbox':
								if (input.checked) {
									if (value[input.name]) {
										value[input.name].push(input.value);
									} else {
										value[input.name] = [input.value];
									}
								}
								break;
							default:
								value[input.name] = input.value;
						}
						return value;
					}, {});
					options.onSubmit(formValues);
				}
			} else {
				formElement.submit();
			}
		}

		var isValid = true;
		options.rules.forEach(rule => {
			var inputElements = formElement.querySelectorAll(rule.selector);

			if (selectorRules[rule.selector]) {
				selectorRules[rule.selector].push(rule.test);
			} else {
				selectorRules[rule.selector] = [rule.test];
			}

			Array.from(inputElements).forEach(inputElement => {
				inputElement.onblur = () => {
					validate(inputElement, rule);
				}

				inputElement.oninput = () => {
					var parentElement = getParent(inputElement, options.formGroupSelector);
					parentElement.querySelector(options.errorSelector).innerText = "";
					parentElement.classList.remove('invalid');
				}
			});
		});
	}
}

Validator.isRequired = (selector, message) => {
	return {
		selector,
		test: value => {
			if (typeof value === 'string') value = value.trim();
			return value ? undefined : message || 'Phải nhập trường này!';
		}
	}
}

Validator.isEmail = (selector, message) => {
	return {
		selector,
		test: value => {
			var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
			return regex.test(value) ? undefined : message || "Email không hợp lệ!";
		}
	}
}

Validator.minLength = (selector, min, message) => {
	return {
		selector,
		test: value => {
			return value.length >= min ? undefined : message || `Tối thiểu ${min} kí tự!`;
		}
	}
}

Validator.isConfirmed = (selector, getConfirmedValue, message) => {
	return {
		selector,
		test: value => {
			return value == getConfirmedValue() ? undefined : message || "Không hợp lệ!";
		}
	}
}