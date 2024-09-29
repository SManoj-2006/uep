
const postProjectBtn = document.querySelector('.post-project-btn');
const projectFormSection = document.getElementById('project-form-section');
const projectForm = document.getElementById('project-form');
const matchmakingSection = document.getElementById('matchmaking-section');
const progressBar = document.getElementById('matching-progress');
const progressText = document.getElementById('progress-text');
const resultsSection = document.getElementById('results-section');
const engineerProfiles = document.getElementById('engineer-profiles');
const logoutBtn = document.querySelector('.logout-btn');
const logoutModal = document.getElementById('logout-modal');
const successModal = document.getElementById('success-modal');
const modalOkBtns = document.querySelectorAll('.modal-ok-btn');
const projectDescription = document.getElementById('project-description');
const charCounter = document.getElementById('char-counter');
const fileUpload = document.getElementById('file-upload');
const fileInput = document.getElementById('additional-files');
const proceedTeamBtn = document.querySelector('.proceed-team-btn');

postProjectBtn.addEventListener('click', () => {
    projectFormSection.classList.toggle('hidden');
    if (!projectFormSection.classList.contains('hidden')) {
        projectFormSection.scrollIntoView({ behavior: 'smooth' });
    }
});

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(projectForm);
    const selectedDisciplines = [];
    formData.getAll('disciplines').forEach(discipline => selectedDisciplines.push(discipline));

    if (selectedDisciplines.length === 0) {
        alert('Please select at least one Engineering Discipline.');
        return;
    }

    startMatchmaking(selectedDisciplines);
});

logoutBtn.addEventListener('click', () => {
    logoutModal.classList.remove('hidden');
});

modalOkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        logoutModal.classList.add('hidden');
        successModal.classList.add('hidden');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        window.location.href = 'index.html';
    });
});

projectDescription.addEventListener('input', () => {
    const currentLength = projectDescription.value.length;
    charCounter.textContent = `${currentLength}/1000`;
});

fileUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUpload.classList.add('dragover');
});
fileUpload.addEventListener('dragleave', () => {
    fileUpload.classList.remove('dragover');
});
fileUpload.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUpload.classList.remove('dragover');
    const files = e.dataTransfer.files;
    handleFiles(files);
});
fileUpload.addEventListener('click', () => {
    fileInput.click();
});
fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    handleFiles(files);
});

function handleFiles(files) {
    console.log('Files uploaded:', files);
}

function startMatchmaking(selectedDisciplines) {
    matchmakingSection.classList.remove('hidden');
    projectFormSection.classList.add('hidden');

    progressBar.style.width = '0%';
    progressText.textContent = 'Matching 0%';

    let progress = 0;
    const matchInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5; 
        if (progress >= 100) {
            progress = 100;
            clearInterval(matchInterval);
            setTimeout(() => {
                matchmakingSection.classList.add('hidden');
                displayEngineerProfiles(selectedDisciplines);
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Matching ${progress}%`;
    }, 800);
}

function displayEngineerProfiles(selectedDisciplines) {
    const engineers = [
        {
            name: 'Rajesh Verma',
            specialization: 'Civil Engineer',
            experience: '8 years',
            ratings: 4.5,
            bio: 'Expert in infrastructure development and urban planning.',
            profilePicture: 'https://plus.unsplash.com/premium_photo-1682092603230-1ce7cf8ca451?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwbWFufGVufDB8fDB8fHww'
        },
        {
            name: 'Anita Gupta',
            specialization: 'Civil Engineer',
            experience: '5 years',
            ratings: 4.2,
            bio: 'Specializes in sustainable construction and green buildings.',
            profilePicture: 'https://img.freepik.com/premium-photo/young-confident-indian-asian-woman-smiles-while-sitting-working-her-laptop_1048944-28786912.jpg'
        },
        {
            name: 'Priya Patel',
            specialization: 'Mechanical Engineer',
            experience: '7 years',
            ratings: 4.7,
            bio: 'Experienced in HVAC systems and machinery design.',
            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZxltI85R0LeZUWACK91OHXDrccatrNokdDcskhX_4S7DSurg-DPzHwhw4xXeD8ma-BM&usqp=CAU'
        },
        {
            name: 'Suresh Kumar',
            specialization: 'Mechanical Engineer',
            experience: '6 years',
            ratings: 4.3,
            bio: 'Expert in automotive engineering and thermodynamics.',
            profilePicture: 'https://www.shutterstock.com/image-photo/closeup-portrait-young-smiling-hispanic-260nw-2327799157.jpg'
        },
        {
            name: 'Anjali Sharma',
            specialization: 'Electrical Engineer',
            experience: '9 years',
            ratings: 4.6,
            bio: 'Specializes in power systems and renewable energy.',
            profilePicture: 'https://media.istockphoto.com/id/512519437/photo/young-female-student-using-tablet-computer.jpg?s=612x612&w=0&k=20&c=z917VgXC8ZF-xJNqlsXqkr6QQz7TWfR5JxUL351XDzc='
        },
        {
            name: 'Vikram Singh',
            specialization: 'Electrical Engineer',
            experience: '4 years',
            ratings: 4.1,
            bio: 'Expert in circuit design and embedded systems.',
            profilePicture: 'https://img.freepik.com/free-photo/smiling-businessman-face-portrait-wearing-suit_53876-148138.jpg'
        },
        {
            name: 'Neha Joshi',
            specialization: 'Software Engineer',
            experience: '5 years',
            ratings: 4.8,
            bio: 'Experienced in full-stack development and cloud computing.',
            profilePicture: 'https://t4.ftcdn.net/jpg/02/81/81/81/360_F_281818128_N2vO4wgyMUG8dHy8WLPxcQZPou6WnLm0.jpg'
        },
        {
            name: 'Arjun Mehta',
            specialization: 'Software Engineer',
            experience: '6 years',
            ratings: 4.4,
            bio: 'Expert in machine learning and artificial intelligence.',
            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6loIwxY5HfwQEX1fA21S5-HbGc2gyfwE_pQ&s'
        },
        {
            name: 'Meera Nair',
            specialization: 'Structural Engineer',
            experience: '7 years',
            ratings: 4.5,
            bio: 'Specializes in seismic design and structural analysis.',
            profilePicture: 'https://st2.depositphotos.com/4157265/46924/i/450/depositphotos_469246596-stock-photo-smiling-indian-woman-using-laptop.jpg'
        },
        {
            name: 'Rohit Desai',
            specialization: 'Chemical Engineer',
            experience: '5 years',
            ratings: 4.3,
            bio: 'Experienced in process engineering and material science.',
            profilePicture: 'https://st.depositphotos.com/1011643/4430/i/450/depositphotos_44309759-stock-photo-young-indian-man-outdoors.jpg'
        },
        {
            name: 'Kiran Rao',
            specialization: 'Aerospace Engineer',
            experience: '6 years',
            ratings: 4.6,
            bio: 'Expert in aerodynamics and propulsion systems.',
            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnwf0LT1ts58csSCr5N05qmTHMYStVvWmOXQ&s'
        },
        {
            name: 'Sneha Kapoor',
            specialization: 'Biomedical Engineer',
            experience: '4 years',
            ratings: 4.2,
            bio: 'Specializes in medical device design and biotechnology.',
            profilePicture: 'images/sneha_kapoor.jpg'
        },
        {
            name: 'Deepak Sinha',
            specialization: 'Industrial Engineer',
            experience: '7 years',
            ratings: 4.4,
            bio: 'Experienced in manufacturing processes and supply chain management.',
            profilePicture: 'https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL3Jhd3BpeGVsX29mZmljZV8zMl9wb3J0cmFpdF9vZl9oYXBweV9pbmRpYW5fd29tYW5fc21pbGluZ19zdGFuZF85MTY4MWQ4Zi1iYWUyLTRhYWUtOTZhOS1iYWQ3OWQ2ZjgxODJfMi5qcGc.jpg'
        },
        {
            name: 'Pooja Malhotra',
            specialization: 'Petroleum Engineer',
            experience: '5 years',
            ratings: 4.3,
            bio: 'Expert in drilling engineering and reservoir management.',
            profilePicture: 'images/pooja_malhotra.jpg'
        },
        {
            name: 'Ravi Bhatt',
            specialization: 'Computer Engineer',
            experience: '6 years',
            ratings: 4.5,
            bio: 'Specializes in computer architecture and hardware design.',
            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvHOqSGRmj_SeRuzMpVCHbYeBtLAYKJmk3Vg&s'
        },
        {
            name: 'Ankit Verma',
            specialization: 'Nuclear Engineer',
            experience: '8 years',
            ratings: 4.7,
            bio: 'Experienced in reactor design and radiation safety.',
            profilePicture: 'images/ankit_verma.jpg'
        },
        {
            name: 'Sonia Rao',
            specialization: 'Marine Engineer',
            experience: '5 years',
            ratings: 4.2,
            bio: 'Expert in ship design and offshore engineering.',
            profilePicture: 'images/sonia_raoa.jpg'
        },
        {
            name: 'Kunal Sharma',
            specialization: 'Systems Engineer',
            experience: '7 years',
            ratings: 4.6,
            bio: 'Specializes in systems integration and project management.',
            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxkmRuaPPz3SU9A5hYKfhv3-FQoItUW9KYvw&s'
        },
        {
            name: 'Divya Singh',
            specialization: 'Automotive Engineer',
            experience: '6 years',
            ratings: 4.4,
            bio: 'Experienced in vehicle dynamics and safety engineering.',
            profilePicture: 'images/divya_singh.jpg'
        },
        {
            name: 'Manish Gupta',
            specialization: 'Agricultural Engineer',
            experience: '4 years',
            ratings: 4.1,
            bio: 'Expert in sustainable farming and irrigation systems.',
            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzTODhj3Ap6bYRSRCMNKix7E9xY2dvdHyZPQ&s'
        },
        {
            name: 'Priya Reddy',
            specialization: 'Materials Engineer',
            experience: '5 years',
            ratings: 4.3,
            bio: 'Specializes in nanomaterials and biomaterials.',
            profilePicture: 'https://static.vecteezy.com/system/resources/thumbnails/046/654/052/small/confident-indian-businesswoman-in-indian-dress-at-her-office-photo.jpeg'
        },
        {
            name: 'Vikrant Joshi',
            specialization: 'Robotics Engineer',
            experience: '6 years',
            ratings: 4.5,
            bio: 'Experienced in robotic automation and control systems.',
            profilePicture: 'https://images.pexels.com/photos/938639/pexels-photo-938639.jpeg'
        },
        {
            name: 'Aisha Khan',
            specialization: 'Geotechnical Engineer',
            experience: '7 years',
            ratings: 4.4,
            bio: 'Expert in soil mechanics and foundation engineering.',
            profilePicture: 'images/aisha_khan.jpg'
        },
        {
            name: 'Rohini Singh',
            specialization: 'Telecommunications Engineer',
            experience: '5 years',
            ratings: 4.2,
            bio: 'Specializes in wireless communication and networking.',
            profilePicture: 'https://t3.ftcdn.net/jpg/03/17/91/74/360_F_317917475_h4sM0jHpoLYNm4vfjtAL53Gx5yYWFbNn.jpg'
        },
        {
            name: 'Siddharth Mehra',
            specialization: 'Mining Engineer',
            experience: '6 years',
            ratings: 4.3,
            bio: 'Experienced in mine design and mineral processing.',
            profilePicture: 'images/siddharth_mehra.jpg'
        },
        {
            name: 'Nidhi Sharma',
            specialization: 'Energy Engineer',
            experience: '7 years',
            ratings: 4.5,
            bio: 'Specializes in renewable energy systems and energy efficiency.',
            profilePicture: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA4L3Jhd3BpeGVsX29mZmljZV8zNF9waG90b19vZl9oaXNwYW5pY19zbWlsaW5nX3Rvb3RoeV9sYXRpbm9faW5kaV83Nzk3YWZlMC1hYjQ0LTRlNmQtYmQ4Ni04ZDUzZTdkMGEwMjFfMS5qcGc.jpg'
        },
        {
            name: 'Vikas Malhotra',
            specialization: 'Mechatronics Engineer',
            experience: '5 years',
            ratings: 4.4,
            bio: 'Expert in automation and intelligent systems.',
            profilePicture: 'images/vikas_malhotra.jpg'
        },
        {
            name: 'Tanvi Kapoor',
            specialization: 'Data Engineer',
            experience: '6 years',
            ratings: 4.6,
            bio: 'Experienced in big data technologies and data pipeline development.',
            profilePicture: 'https://t3.ftcdn.net/jpg/06/36/69/86/360_F_636698674_DroChEj5eWmZiaZOSDMnj8hcDqqw74Fp.jpg'
        }
    ];

    const matchedEngineers = [];

    selectedDisciplines.forEach(discipline => {
        const filteredEngineers = engineers.filter(engineer => engineer.specialization.toLowerCase() === discipline.toLowerCase() || engineer.specialization.toLowerCase() === `${discipline.toLowerCase()} engineer`);
        if (filteredEngineers.length > 0) {
            const randomEngineer = filteredEngineers[Math.floor(Math.random() * filteredEngineers.length)];
            matchedEngineers.push(randomEngineer);
        }
    });

    const uniqueEngineers = [...new Map(matchedEngineers.map(item => [item['name'], item])).values()];
    engineerProfiles.innerHTML = '';
    uniqueEngineers.forEach(engineer => {
        const profile = document.createElement('div');
        profile.classList.add('engineer-profile');
        profile.innerHTML = `
            <img src="${engineer.profilePicture}" alt="${engineer.name}">
            <h3>${engineer.name}</h3>
            <p>Specialization: ${engineer.specialization}</p>
            <p>Experience: ${engineer.experience}</p>
            <p class="ratings">Rating: ${generateStars(engineer.ratings)}</p>
            <p>${engineer.bio}</p>
        `;
        engineerProfiles.appendChild(profile);
    });
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }

    if (halfStar) {
        stars += '⭐️';
    }

    return stars;
}

proceedTeamBtn.addEventListener('click', () => {
    successModal.classList.remove('hidden');

    const okButton = successModal.querySelector('.modal-ok-btn');
    okButton.addEventListener('click', () => {
        successModal.classList.add('hidden');
        window.location.href = 'index.html';
    });
});
