import * as FilterConverter from '../filter-parser/'
import _ from 'lodash';
import data from './json';
import moment from 'moment';

const dataQuery=(filter,result)=>{
    const filterFn=FilterConverter.toLodashFn(filter);
    const testResult=_(data).filter(x=>filterFn(x,moment)).map(d=>d.ProductID).join(',');
    return testResult;
}

export default dataQuery;