export const getPublishedTime = (scrapedDate: string, time: string): string => {
    const publishedDateTime = new Date(scrapedDate);
    const now = new Date();
    const diffMs = now.getTime() - publishedDateTime.getTime();
    const totalDiffMins = Math.floor(diffMs / (1000 * 60));
    const normalizedTime = time.trim().toLowerCase();
    let additionalMins = 0;

    const extractTimeValue = (regex: RegExp): number => {
        const match = normalizedTime.match(regex);
        return match ? parseInt(match[1], 10) : 0;
    };

    if (normalizedTime === "yesterday") {
        additionalMins = 24 * 60;
    } else {
        additionalMins += extractTimeValue(/(\d+)\s+day[s]?/) * 24 * 60;
        additionalMins += extractTimeValue(/(\d+)\s+hour[s]?/) * 60;
        additionalMins += extractTimeValue(/(\d+)\s+minute[s]?/);
    }

    const finalMins = totalDiffMins + additionalMins;

    if (finalMins < 1) return "Just now";
    if (finalMins < 60)
        return `${finalMins} minute${finalMins > 1 ? "s" : ""} ago`;

    const finalHours = Math.floor(finalMins / 60);
    if (finalHours < 24)
        return `${finalHours} hour${finalHours > 1 ? "s" : ""} ago`;

    const finalDays = Math.floor(finalHours / 24);
    return `${finalDays} day${finalDays > 1 ? "s" : ""} ago`;
};

export const getReadTime = (content: string | null): string => {
    if (!content) return "0 min read";

    const words = content.split(" ");
    const minutes = Math.ceil(words.length / 200);

    return `${minutes} ${minutes === 1 ? 'min' : 'mins'} read`;
};
