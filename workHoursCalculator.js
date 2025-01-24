function calculateFridayDeparture(workLog) {
    function parseTime(day, timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }

    function calculateHours(start, end) {
        const diff = (end - start) / (1000 * 60 * 60);
        return diff;
    }

    const standardWorkWeekHours = 40;

    let totalHoursWorked = 0;
    for (const day of ['Monday', 'Tuesday', 'Wednesday', 'Thursday']) {
        if (workLog[day]) {
            const { start, end } = workLog[day];
            const startTime = parseTime(day, start);
            const endTime = parseTime(day, end);
            totalHoursWorked += calculateHours(startTime, endTime);
        }
    }

    const remainingHours = standardWorkWeekHours - totalHoursWorked;

    if (workLog.Friday && workLog.Friday.start) {
        const fridayStartTime = parseTime('Friday', workLog.Friday.start);
        const fridayEndTime = new Date(fridayStartTime.getTime() + remainingHours * 60 * 60 * 1000);
        const departureTime = fridayEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `To meet a 40-hour workweek, you can leave on Friday at ${departureTime}.`;
    } else {
        return 'Please provide your start time for Friday.';
    }
}

// Plug in your hours here.
const workLog = {
    Monday: { start: '04:00', end: '17:00' },
    Tuesday: { start: '08:00', end: '16:30' },
    Wednesday: { start: '08:00', end: '16:00' },
    Thursday: { start: '09:00', end: '17:30' },
    Friday: { start: '08:00' } // Provide your actual start time for Friday
};

// Run this command in your termail after navigating to the file: node workHoursCalculator.js
console.log(calculateFridayDeparture(workLog));
