export class Utils {

    static formatTitle(title: string) {
        if (title.length >= 24) {
            return title.substr(0, 24) + "...";
        } else {
            return title;
        }
    }
    static getDurationInSecond(input: string) {
        var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0, minutes = 0, seconds = 0, totalseconds;

        if (reptms.test(input)) {
            let matches = <string[]>reptms.exec(input);
            if (matches[1]) { hours = Number(matches[1]); }
            if (matches[2]) { minutes = Number(matches[2]); }
            if (matches[3]) { seconds = Number(matches[3]); }
            totalseconds = hours * 3600 + minutes * 60 + seconds;
        }
        return totalseconds;
    }
    static getVidInfo(e: any): Promise<any> {

        let part = "snippet,contentDetails,statistics,status";
        let apiKey = "AIzaSyDPNBTCUqkueynn2pbfhXwUFfDm9owhVJI";
        let id = e.fieldValue.replace("https://www.youtube.com/watch?v=", "");
        return fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=${part}`)
            .then((data) => data.json()).then((data: any) => {
                if (data.items && data.items.length) {
                    e.title = this.formatTitle(data.items[0].snippet.title);
                    e.duration = this.getDurationInSecond(data.items[0].contentDetails.duration);
                }
                return e;
            });
    }

}