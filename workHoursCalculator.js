function calculateFridayDeparture(workLog) {
    function parseTime(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }

    function calculateHours(start, end) {
        const diff = (end - start) / (1000 * 60 * 60);
        return diff;
    }

    // Standard workweek in hours
    const standardWorkWeekHours = 40;
    const unpaidBreakPerDay = 0.5; // 30-minute unpaid break

    let totalHoursWorked = 0;
    for (const day of ['Monday', 'Tuesday', 'Wednesday', 'Thursday']) {
        if (workLog[day]) {
            const { start, end } = workLog[day];
            const startTime = parseTime(start);
            const endTime = parseTime(end);
            totalHoursWorked += calculateHours(startTime, endTime) - unpaidBreakPerDay;
        }
    }

    const remainingHours = standardWorkWeekHours - totalHoursWorked;

    if (workLog.Friday && workLog.Friday.start) {
        const fridayStartTime = parseTime(workLog.Friday.start);
        const fridayEndTime = new Date(fridayStartTime.getTime() + (remainingHours + unpaidBreakPerDay) * 60 * 60 * 1000);
        const departureTime = fridayEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `To meet a 40-hour workweek, you can leave on Friday at ${departureTime}.`;
    } else {
        return 'Please provide your start time for Friday.';
    }
}

// Plug in your hours here.
const workLog = {
    Monday: { start: '08:00', end: '16:30' },
    Tuesday: { start: '07:53', end: '16:34' },
    Wednesday: { start: '08:16', end: '16:30' },
    Thursday: { start: '07:47', end: '16:31' },
    Friday: { start: '07:57' } // Provide your actual start time for Friday
};

// Run this command in your termail after navigating to the file: node workHoursCalculator.js
console.log(calculateFridayDeparture(workLog));
