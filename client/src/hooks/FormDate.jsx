export function formatMemberSince(inputDateString) {
	const options = { month: "short", day: "2-digit", year: "numeric" };
	const formattedDate = new Date(inputDateString).toLocaleDateString("en-US", options);
	return formattedDate;
}

export function formatDate(inputDateString) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const date = new Date(inputDateString);
	const monthName = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();

	// Function to add ordinal suffix to day
	function getOrdinalSuffix(day) {
		if (day >= 11 && day <= 13) {
			return day + "th";
		}
		switch (day % 10) {
			case 1:
				return day + "st";
			case 2:
				return day + "nd";
			case 3:
				return day + "rd";
			default:
				return day + "th";
		}
	}

	const formattedDate = `${monthName} ${getOrdinalSuffix(day)}, ${year}`;
	return formattedDate;
}

export const formatDateTime = (dateTime) => {
	const options = {
		weekday: 'short', // Abbreviated weekday (e.g., "Thu")
		month: 'short',   // Abbreviated month name (e.g., "Mar")
		day: 'numeric',   // Numeric day of the month (e.g., "14")
		year: 'numeric',  // Full year (e.g., "2024")
		hour: '2-digit',  // Two-digit hour (e.g., "20")
		minute: '2-digit', // Two-digit minute (e.g., "29")
		second: '2-digit', // Two-digit second (e.g., "00")
	}

	return dateTime.toLocaleString('en-US', options)
}
// timeUtils.js

export function timeAgo(date) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    }
    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";
}


