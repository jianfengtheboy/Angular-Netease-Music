import { Pipe, PipeTransform } from '@angular/core';
import { time, emoji } from './utils';

@Pipe({ name: 'Pplaycount' })
export class PplaycountPipe implements PipeTransform {
    transform(v : number, exponent : string) {
        if (!v) {
            return '';
        }
        const s = v < 1e5 ? v : (v / 1e4).toFixed(1) + '万';
        return s;
    }
}

@Pipe({ name : 'Pemoji'})
export class PemojiPipe implements PipeTransform {
    transform(v : string, exponent : string) {
        return emoji(v);
    }
}

@Pipe({ name : 'Ptime'})
export class PtimePipe implements PipeTransform {
    transform(v:number, exponent : string ) {
        return time(v);
    }
}

@Pipe({ name: 'PdateM' })
export class PdateMPipe implements PipeTransform {
    transform(v, exponent: string) {
        v = new Date(v);
        const y = v.getFullYear() === new Date().getFullYear() ? '' : v.getFullYear() + '-';
        let m = v.getMonth() + 1;
        m = m > 9 ? m : `0${m}`;
        let d = v.getDate();
        d = d > 9 ? d : `0${d}`;
        return y + m + '-' + d;
    }
}

@Pipe({ name: 'PdateS' })
export class PdateSPipe implements PipeTransform {
    transform(v, exponent: string) {
        v = new Date(v);
        let m = v.getMinutes();
        m = m > 9 ? m : `0${m}`;
        let s = v.getSeconds();
        s = s > 9 ? s : `0${s}`;
        return m + ':' + s;
    }
}

@Pipe({ name: 'Pbtdto' })
export class PbtdtoPipe implements PipeTransform {
    transform(v, exponent: string) {
        v = new Date(v);
        const m = v.getMonth() + 1;
        const d: any = v.getDate();
        const s = '魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯';
        const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
        return s.substr(m * 2 - (d < arr[m - 1] ? 2 : 0), 2) + '座';
        // const xz = '魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'.substr(
        //   m * 2 - (d < ('102223444433'.charAt(m - 1) - - 19)) * 2,2);
        //  return xz + '座';
    }
}
