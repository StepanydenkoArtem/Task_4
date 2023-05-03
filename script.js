
const blogList = document.querySelector('.blog-list ul');
const sortSelect = document.getElementById('sort-select');
const searchForm = document.querySelector('form');

const itemsPerPage = 8;
const pages = Math.ceil(blogList.children.length / itemsPerPage);
const pagination = document.createElement('div');
pagination.classList.add('pagination');
for (let i = 1; i <= pages; i++) {
  const pageLink = document.createElement('a');
  pageLink.href = '#';
  pageLink.textContent = i;
  pagination.appendChild(pageLink);
}
blogList.insertAdjacentElement('afterend', pagination);
const pageLinks = pagination.querySelectorAll('a');

function sortBlogs(property) {
  const blogs = Array.from(blogList.children);
  blogs.sort((a, b) => {
    const aProp = a.querySelector(property).textContent.toLowerCase();
    const bProp = b.querySelector(property).textContent.toLowerCase();
    if (property === 'h2') {
      return aProp.localeCompare(bProp);
    } else {
      return new Date(bProp) - new Date(aProp);
    }
  });
  blogList.innerHTML = '';
  blogs.forEach(blog => blogList.appendChild(blog));
}

function searchBlogs(query) {
  const blogs = Array.from(blogList.children);
  blogs.forEach(blog => {
    const title = blog.querySelector('h2')..textContent.toLowerCase();
      if (title.toLowerCase().includes(query.toLowerCase())) {
  blog.style.display = 'block';
} else {
  blog.style.display = 'none';
}
});
}

sortSelect.addEventListener('change', () => {
const sortBy = sortSelect.value;
if (sortBy === 'title') {
sortBlogs('h2');
} else {
sortBlogs('p');
}
});

searchForm.addEventListener('submit', event => {
event.preventDefault();
const searchInput = searchForm.querySelector('input[type="text"]');
const query = searchInput.value;
searchBlogs(query);
searchInput.value = '';
});


pageLinks.forEach(pageLink => {
pageLink.addEventListener('click', event => {
event.preventDefault();
const currentPage = parseInt(event.target.textContent);
const start = (currentPage - 1) * itemsPerPage;
const end = start + itemsPerPage;
const blogs = Array.from(blogList.children);
blogs.forEach((blog, index) => {
if (index >= start && index < end) {
blog.style.display = 'block';
} else {
blog.style.display = 'none';
}
});
});
});

sortBlogs('p');

pageLinks[0].click();

