const courses = [
    {
        subject: 'WDD',
        number: 130,
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        credits: 2,
        completed: true
    },
    {
        subject: 'CSE',
        number: 110,
        credits: 2,
        completed: false
    }
];

const coursesContainer = document.querySelector('#courses');
const creditsContainer = document.querySelector('#credits');

function displayCourses(courseList) {

    coursesContainer.innerHTML = '';

    courseList.forEach(course => {

        const div = document.createElement('div');

        div.classList.add('course-card');

        if (course.completed) {
            div.classList.add('completed');
        }

        div.textContent = `${course.subject} ${course.number}`;

        coursesContainer.appendChild(div);
    });

    const totalCredits = courseList.reduce((total, course) => total + course.credits, 0);

    creditsContainer.textContent = totalCredits;
}


displayCourses(courses);


document.querySelector('#all').addEventListener('click', () => {
    displayCourses(courses);
});


document.querySelector('#wdd').addEventListener('click', () => {
    const filtered = courses.filter(course => course.subject === 'WDD');
    displayCourses(filtered);
});


document.querySelector('#cse').addEventListener('click', () => {
    const filtered = courses.filter(course => course.subject === 'CSE');
    displayCourses(filtered);
});