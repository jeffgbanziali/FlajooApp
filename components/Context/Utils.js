import { useTranslation } from "react-i18next";

export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};





export const dateParser = (num) => {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
       weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
};


export const FormationDateParser = (num) => {
    let options = {
        //hour: "2-digit",
        //minute: "2-digit",
        //second: "2-digit",
       // weekday: "long",
        year: "numeric",
        month: "short",
        //day: "numeric",
    };

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
};

export const timestampParser = (num) => {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    let date = new Date(num).toLocaleDateString("fr-FR", options);

    return date.toString();
};



export const timestampStoryParser = (num) => {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    let date = new Date(num).toLocaleDateString("fr-FR", options);

    return date.toString();
};

export const formatMessageDate = (conversationDate) => {
    const currentDate = new Date();
    const messageDate = new Date(conversationDate);
    const timeDifference = currentDate - messageDate;


    const millisecondsPerMinute = 1000 * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;

    const pad = (number) => {
        return number < 10 ? '0' + number : number;
    };

    if (timeDifference < millisecondsPerDay) {
        // Affichage de l'heure au format "hh:mm"
        const formattedTime = `${pad(messageDate.getHours())}:${pad(messageDate.getMinutes())}`;
        return formattedTime;

    };

}











export const formatConversationDate = (conversationDate) => {
    const currentDate = new Date();
    const messageDate = new Date(conversationDate);
    const timeDifference = currentDate - messageDate;


    const millisecondsPerMinute = 1000 * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;

    const pad = (number) => {
        return number < 10 ? '0' + number : number;
    };

    if (timeDifference < millisecondsPerDay) {
        // Affichage de l'heure au format "hh:mm"
        const formattedTime = `${pad(messageDate.getHours())}:${pad(messageDate.getMinutes())}`;
        return formattedTime;
    } else if (timeDifference >= millisecondsPerDay && timeDifference < millisecondsPerDay * 2) {
        return "Hier";
    } else if (timeDifference >= millisecondsPerDay * 2 && timeDifference < millisecondsPerDay * 7) {
        const daysAgo = Math.floor(timeDifference / millisecondsPerDay);
        return `Il y a ${daysAgo} jour${daysAgo > 1 ? "s" : ""}`;
    } else if (timeDifference >= millisecondsPerDay * 7) {
        return messageDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    }
};




export const formatPostDate = (timestamp) => {
    const currentDate = new Date();
    const postDate = new Date(timestamp);
    const timeDifference = currentDate - postDate;

    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = millisecondsPerSecond * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;
    const millisecondsPerWeek = millisecondsPerDay * 7;
    const millisecondsPerYear = millisecondsPerDay * 365;

    if (timeDifference < millisecondsPerMinute) {
        const secondsAgo = Math.floor(timeDifference / millisecondsPerSecond);
        return `Il y a ${secondsAgo} seconde(s)`;
    } else if (timeDifference < millisecondsPerHour) {
        const minutesAgo = Math.floor(timeDifference / millisecondsPerMinute);
        return `Il y a ${minutesAgo} minute(s)`;
    } else if (timeDifference < millisecondsPerDay) {
        const hoursAgo = Math.floor(timeDifference / millisecondsPerHour);
        if (isSameDay(currentDate, postDate)) {
            return `Aujourd'hui, ${pad(postDate.getHours())}:${pad(postDate.getMinutes())}`;
        } else if (isYesterday(currentDate, postDate)) {
            return `Hier à ${pad(postDate.getHours())}:${pad(postDate.getMinutes())}`;
        } else {
            return `Il y a ${hoursAgo} heure(s)`;
        }
    } else if (timeDifference < millisecondsPerWeek) {
        const daysAgo = Math.floor(timeDifference / millisecondsPerDay);
        return `Il y a ${daysAgo} jour(s)`;
    } else {
        const weeksAgo = Math.floor(timeDifference / millisecondsPerWeek);
        return `Il y a ${weeksAgo} semaine(s)`;
    }
};

const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
};

const isYesterday = (currentDate, postDate) => {
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    return isSameDay(yesterday, postDate);
};

const pad = (number) => {
    return number < 10 ? '0' + number : number;
};



export const formatTimeAgo = (timeDifference, language) => {
    const { t, i18n } = useTranslation(); // Déplacez ceci à l'intérieur d'un composant de fonction

    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = millisecondsPerSecond * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;
    const millisecondsPerWeek = millisecondsPerDay * 7;
    const millisecondsPerYear = millisecondsPerDay * 365;

    if (i18n.language === 'fr') {
        if (timeDifference < millisecondsPerMinute) {
            const secondsAgo = Math.floor(timeDifference / millisecondsPerSecond);
            return `il y a ${secondsAgo} seconde(s)`;
        } else if (timeDifference < millisecondsPerHour) {
            const minutesAgo = Math.floor(timeDifference / millisecondsPerMinute);
            return `il y a ${minutesAgo} minute(s)`;
        } else if (timeDifference < millisecondsPerDay) {
            const hoursAgo = Math.floor(timeDifference / millisecondsPerHour);
            return `il y a ${hoursAgo} heure(s)`;
        } else if (timeDifference < millisecondsPerWeek) {
            const daysAgo = Math.floor(timeDifference / millisecondsPerDay);
            return `il y a ${daysAgo} jour(s)`;
        } else {
            const weeksAgo = Math.floor(timeDifference / millisecondsPerWeek);
            return `il y a ${weeksAgo} semaine(s)`;
        }
    } else {
        if (timeDifference < millisecondsPerMinute) {
            const secondsAgo = Math.floor(timeDifference / millisecondsPerSecond);
            return `${secondsAgo} second${secondsAgo === 1 ? '' : 's'} ago`;
        } else if (timeDifference < millisecondsPerHour) {
            const minutesAgo = Math.floor(timeDifference / millisecondsPerMinute);
            return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
        } else if (timeDifference < millisecondsPerDay) {
            const hoursAgo = Math.floor(timeDifference / millisecondsPerHour);
            return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
        } else if (timeDifference < millisecondsPerWeek) {
            const daysAgo = Math.floor(timeDifference / millisecondsPerDay);
            return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
        } else {
            const weeksAgo = Math.floor(timeDifference / millisecondsPerWeek);
            return `${weeksAgo} week${weeksAgo === 1 ? '' : 's'} ago`;
        }
    }
};

