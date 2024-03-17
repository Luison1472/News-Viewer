const Nav = (data) => {
    const navElement = document.createElement('nav');
    navElement.className = 'category-list';

    navElement.insertAdjacentHTML('beforeend', `
      <ul>
         <li id="all" class="category-item active">전체보기</li>
         <li id="business" class="category-item">비즈니스</li>
         <li id="entertainment" class="category-item">엔터테인먼트</li>
         <li id="health" class="category-item">건강</li>
         <li id="science" class="category-item">과학</li>
         <li id="sports" class="category-item">스포츠</li>
         <li id="technology" class="category-item">기술</li>
      </ul>  
   `);

    const categoryItem = navElement.querySelectorAll('.category-item');

    categoryItem.forEach((element) => {
        element.addEventListener('click', (event) => {
            categoryItem.forEach((element) => {
                element.classList.remove('active');
            });
            event.target.classList.add('active');
            data.category = event.target.id;
        });
    });

    return navElement;
};


export default Nav;
