
document.addEventListener('DOMContentLoaded', function () {
    const daySelect = document.getElementById('select-day');
    const monthSelect = document.getElementById('select-month');
    const yearSelect = document.getElementById('select-year');
    const calendarBody = document.getElementById('calendar-body');

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();


    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = month;
        monthSelect.appendChild(option);
    });

    for (let year = currentYear - 25; year <= currentYear + 25; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.text = year;
        yearSelect.appendChild(option);
    }

   
    function updateDaysInMonth(year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        daySelect.innerHTML = '';
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.text = day;
            daySelect.appendChild(option);
        }
    }

    function updateCalendar(year, month) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        calendarBody.innerHTML = '';

        let row = document.createElement('tr');
        for (let i = 0; i < firstDay; i++) {
            row.appendChild(document.createElement('td'));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            if (row.children.length === 7) {
                calendarBody.appendChild(row);
                row = document.createElement('tr');
            }

            const cell = document.createElement('td');
            cell.textContent = day;
            row.appendChild(cell);
        }

        if (row.children.length > 0) {
            calendarBody.appendChild(row);
        }
    }


    monthSelect.addEventListener('change', function () {
        currentMonth = parseInt(this.value);
        updateDaysInMonth(currentYear, currentMonth);
        updateCalendar(currentYear, currentMonth);
    });

    yearSelect.addEventListener('change', function () {
        currentYear = parseInt(this.value);
        updateDaysInMonth(currentYear, currentMonth);
        updateCalendar(currentYear, currentMonth);
    });

    // Inicializa o calendário na data atual
    monthSelect.value = currentMonth;
    yearSelect.value = currentYear;
    updateDaysInMonth(currentYear, currentMonth);
    updateCalendar(currentYear, currentMonth);
});

document.getElementById('gerenciar-alunos').addEventListener('click', function() {
    alert('Ação: Gerenciar Alunos');
});

document.getElementById('cadastro-disciplinas').addEventListener('click', function() {
    alert('Ação: Cadastro de Disciplinas');
});

document.getElementById('gerenciar-turma').addEventListener('click', function() {
    alert('Ação: Gerenciar Turma');
});

document.getElementById('gerenciar-ano').addEventListener('click', function() {
    alert('Ação: Gerenciar Ano Letivo');
});

document.getElementById('atualizar-dados').addEventListener('click', function() {
    alert('Ação: Atualizar dados do aluno');
});

document.getElementById('mostrar-esconder').addEventListener('click', function() {
    alert('Alternando visualização de atividades.');
    
});



