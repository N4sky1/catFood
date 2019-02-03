'use strict'

// данные для карточек
const valueForTemplate = [
{
	taste: 'с фуа-гра',
	portions: '<b>10</b> порций',
	gift: 'мышь в подарок',
	kilograms: '0,5',
	url: './img/cat.png',
	additional: '',
	salesText: 'Печень утки разварная с артишоками.'
}, 
{
	taste: 'с рыбой',
	portions: '<b>40</b> порций',
	gift: '<b>2</b> мыши в подарок',
	kilograms: '2',
	url: './img/cat.png',
	additional: '',
	salesText: 'Головы щучьи с чесноком да свежайшая сёмгушка.'
}, 
{
	taste: 'с курой',
	portions: '<b>100</b> порций',
	gift: '<b>5</b> мышей в подарок',
	kilograms: '5',
	url: './img/cat.png',
	additional: 'заказчик доволен',
	salesText: 'Филе из цыплят с трюфелями в бульоне.'
}
];
// функция отрисовки шаблона карточек с даннымим из valueForTemplate
const showFood = function(value) {
	for(let i=0; i<value.length; i++) {
		const catFood = document.querySelector('.cat-food__list'); 
		const foodList = document.createElement(`div`);
		foodList.className = 'cat-food__list-item-wrap';
		foodList.innerHTML = `
			<div class="cat-food__list-item">
				<div class="cat-food__short-descr-wrap">
					<span class="cat-food__triangle"></span>
					<p class="cat-food__short-descr">Cказочное заморское явство</p>
					<p class="cat-food__short-question display-none">Котэ не одобряет?</p>
				</div>
				<div class="cat-food__body-wrap">
					<div class="cat-food__background">
						<h2>Нямушка</h2>
						<h3 class="cat-food__taste">${value[i].taste}</h3>
						<div class="cat-food__description">
							<p class="cat-food__portions">${value[i].portions}</p>
							<p class="cat-food__gift">${value[i].gift}</p>
						</div>
						<p class="cat-food__client">${value[i].additional}</p>
						<div class="cat-food__weight-contaniner">
							<div class="cat-food__empty"></div>
							<div class="cat-food__weight">
								<span class="cat-food__kilograms">${value[i].kilograms}</span>
								<span>КГ</span>
							</div>
						</div>
					</div>	
				</div>
			</div>
			<div class="cat-food__sales-text-wrap sales-text">
				<p class="sales-text__initial">
					Чего сидишь? Порадуй котэ, <span class="sales-text__sales-link">купи.</span>
				</p>
				<p class="sales-text__description display-none">
					${value[i].salesText}
				</p>
				<p class="sales-text__out-of display-none">
					Печалька, ${value[i].taste} закончился.
				</p>
			</div>	
		<style>
			.cat-food__background {
				background: url('${value[i].url}') no-repeat;
				background-position: 0% 100%;
			}
		</style>
		`;
		catFood.appendChild(foodList);
	}
};
showFood(valueForTemplate);

const catFoodItems = document.querySelectorAll('.cat-food__list-item'),
	  salesLink = document.querySelectorAll('.sales-text__sales-link'),
	  salesDescription = document.querySelectorAll('.sales-text__description'),
	  salesInitial = document.querySelectorAll('.sales-text__initial'),
	  shortDescr = document.querySelectorAll('.cat-food__short-descr'),
	  shortQuestion = document.querySelectorAll('.cat-food__short-question');

// отключаем нужную карточку
const desabledItem = catFoodItems[2],
 	  salesTextOutOf = document.querySelectorAll('.sales-text__out-of');

const disapbledItem = function(changeClass, i) {
	changeClass.classList.add('disabled');
	salesInitial[i].classList.add('display-none');
	salesTextOutOf[i].classList.remove('display-none');
	changeClass.addEventListener('click', function(evt) {
		evt.stopImmediatePropagation();
	});
};

disapbledItem(desabledItem, 2);

// меняем карточку при нажатии 

// функция изменения цвета и текста под карточкой 
const getChangedCatItem = function(clickPlace, changeClass, containsClass, changeClass2) {
	for (let i = 0; i<clickPlace.length; i++) {
		clickPlace[i].addEventListener('click', function(evt) {
			if (changeClass[i].classList.contains(containsClass)) {
				changeClass[i].classList.remove(containsClass);
				changeClass2[i].classList.add(containsClass);
			} else {
				changeClass[i].classList.add(containsClass);
				changeClass2[i].classList.remove(containsClass);
			}
		});
	};
};
// меняем цвет контуру и круглому элементу с весом 
getChangedCatItem(catFoodItems, catFoodItems, 'buyed', salesInitial);
getChangedCatItem(salesLink, catFoodItems, 'buyed', salesInitial);
// меняем текст под карточкой
getChangedCatItem(catFoodItems, salesDescription, 'display-none', salesInitial);
getChangedCatItem(salesLink, salesDescription, 'display-none', salesInitial);

// функция изменения текста описания - наверху карточки
const getShortDescription = function(clickPlace, changeClass, changeClass2) {
	for (let i = 0; i<clickPlace.length; i++) {
		clickPlace[i].addEventListener('click', function(evt) {
			if (catFoodItems[i].classList.contains('buyed')) {
				changeClass2[i].classList.remove('display-none');
				changeClass[i].classList.add('display-none');
			} else {
				changeClass2[i].classList.add('display-none');
				changeClass[i].classList.remove('display-none');
			}
		});
	};
};
getShortDescription(catFoodItems, shortQuestion, shortDescr);
getShortDescription(salesLink, shortQuestion, shortDescr);




