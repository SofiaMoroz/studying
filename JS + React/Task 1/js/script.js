'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    
    // 1) Удалить все рекламные блоки со страницы (правая часть сайта)
    const adv = document.querySelectorAll('.promo__adv img');
    adv.forEach(item => {
        item.remove();
    });
    
    
    // 2) Изменить жанр фильма, поменять "комедия" на "драма"
    const genre = document.querySelector('.promo__genre');
    genre.textContent = 'Драма';
    
    
    // 3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
    const poster = document.querySelector('.promo__bg');
    poster.style.backgroundImage = "url(img/bg.jpg)";
    
    
    // 4) Список фильмов на странице сформировать на основании данных из этого JS файла.
    // Отсортировать их по алфавиту 
    // 5) Добавить нумерацию выведенных фильмов 
    // 7) При клике на мусорную корзину - элемент будет удаляться из списка.
    
    const movies = document.querySelectorAll('.promo__interactive-item'),
        moviesList = document.querySelector('ul.promo__interactive-list');

    function sortArr(arr) {
        arr.sort();
    }

    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);
        
        for (let i = 0; i < films.length; i++) {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i+1}) ${films[i]}
                    <div class="delete"></div>
                </li>`;
        }

        document.querySelectorAll('.delete').forEach((item, i) => {
            item.addEventListener('click', function() {
                item.parentElement.remove();
    
                films.splice(i, 1);
                createMovieList(films, parent);
            });
        });
    }

    createMovieList(movieDB.movies, moviesList);
    

    // 5) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - новый фильм добавляется в список. Страница не должна перегружаться. Новый фильм должен добавлятся в movieDB.movies. Для получения доступа к значению input - обращаемся к нему как input.value
    // 6) Если названия фильма больше, чем 21 символ - обрезать его и добавить три точки.
    // 8) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: "Добавляем любимый фильм"
    const addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', function(event) {
        event.preventDefault();

        

        if(addInput.value) {
            let newFilm = addInput.value;
            const favorite = checkbox.checked;

            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 21)}...`;
            }
            
            movieDB.movies.push(newFilm);

            createMovieList(movieDB.movies, moviesList);
 
        }
        
        event.target.reset();

        
    });
    
});
