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
    Monday: { start: '06:28', end: '15:07' },
    Tuesday: { start: '08:06', end: '16:38' },
    Wednesday: { start: '07:46', end: '16:32' },
    Thursday: { start: '07:51', end: '16:33' },
    Friday: { start: '07:59' } // Provide your actual start time for Friday
};

// Mon02/10/25
// MRCOOL IT
// 07:43 AM04:31 PM
// 8:48
// 8:48
// Tue02/11/25
// MRCOOL IT
// 07:57 AM04:33 PM
// 8:36
// 8:36
// Wed02/12/25
// MRCOOL IT
// 07:37 AM04:30 PM
// 8:53
// 8:53
// Thu02/13/25
// MRCOOL IT
// 07:41 AM04:00 PM
// 8:19
// 8:19
// Fri02/14/25
// MRCOOL IT
// 05:18 AM--:--


// Run this command in your termail after navigating to the file: node workHoursCalculator.js
console.log(calculateFridayDeparture(workLog));
