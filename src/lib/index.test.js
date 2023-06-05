import {describe, expect, test} from 'vitest'
import {toSQL,toLodash} from './index';
import _ from 'lodash';

const toSqlCases = [
    {
        "filter": "(UnitsInStock~lte~1~and~ProductName~startswith~'chai'~and~UnitPrice~neq~18~and~ProductID~eq~1)",
        "result": "(UnitsInStock <= 1 AND ProductName LIKE 'chai%' AND UnitPrice <> 18 AND ProductID = 1)"
    },
    {
        "filter": "((ProductID~eq~1~or~ProductID~eq~2)~and~(UnitPrice~gte~0~and~UnitPrice~lte~10))",
        "result": "((ProductID = 1 OR ProductID = 2) AND (UnitPrice >= 0 AND UnitPrice <= 10))"
    },
    {
        "filter": "(ProductID~eq~1~or~ProductID~eq~2)",
        "result": "(ProductID = 1 OR ProductID = 2)"
    },
    {
        "filter": "(FirstOrderedOn~eq~datetime'2023-06-03T04:00:00.000Z'~and~ProductID~eq~1)",
        "result": "(FirstOrderedOn = '2023-06-03 04:00:00' AND ProductID = 1)"
    }, {
        "filter": "(ProductID~eq~2~and~FirstOrderedOn~eq~datetime'2023-06-05T00-00-00')",
        "result": "(ProductID = 2 AND FirstOrderedOn = '2023-06-05 00:00:00')"
    }
];
const lodashCases=[
    {
        "filter": "(UnitsInStock~lte~1~and~ProductName~startswith~'chai'~and~UnitPrice~neq~18~and~ProductID~eq~1)",
        "result": "(x.UnitsInStock <= 1 &&  /^chai/gi.test( x.ProductName ) && x.UnitPrice != 18 && x.ProductID === 1)"
    },
    {
        "filter": "(UnitsInStock~lte~1~and~ProductName~contains~'chai'~and~UnitPrice~neq~18~and~ProductID~eq~1)",
        "result": "(x.UnitsInStock <= 1 &&  /chai/gi.test( x.ProductName ) && x.UnitPrice != 18 && x.ProductID === 1)"
    },
    {
        "filter": "((ProductID~eq~1~or~ProductID~eq~2)~and~(UnitPrice~gte~0~and~UnitPrice~lte~10))",
        "result": "(( x.ProductID === 1 || x.ProductID === 2 ) && ( x.UnitPrice >= 0 && x.UnitPrice <= 10 ))"
    },
    {
        "filter": "(ProductID~eq~1~or~ProductID~eq~2)",
        "result": "( x.ProductID === 1 || x.ProductID === 2 )"
    },
    {
        "filter": "(ProductID~eq~1~and~FirstOrderedOn~eq~datetime'2020-01-01T05:00:00.000Z')",
        "result": "(x.ProductID === 1 && moment(new Date( x.FirstOrderedOn ),'YYYY-MM-DD').isSame(moment( '2020-01-01T05:00:00.000Z','YYYY-MM-DD' ),'day'))"
    },
    {
        "filter": "(FirstOrderedOn~lte~datetime'2020-02-18T05:00:00.000Z')",
        "result": "(moment(new Date( x.FirstOrderedOn ),'YYYY-MM-DD').isSameOrBefore(moment( '2020-02-18T05:00:00.000Z','YYYY-MM-DD' ),'day'))"
    },
    {
        "filter": "FirstOrderedOn~lt~datetime'2020-01-17T05:00:00.000Z'",
        "result": "moment(new Date( x.FirstOrderedOn ),'YYYY-MM-DD').isBefore(moment( '2020-01-17T05:00:00.000Z','YYYY-MM-DD' ),'day')"
    },
    {
        "filter": "(FirstOrderedOn~gte~datetime'2023-03-30T04:00:00.000Z')",
        "result": "(moment(new Date( x.FirstOrderedOn ),'YYYY-MM-DD').isSameOrAfter(moment( '2023-03-30T04:00:00.000Z','YYYY-MM-DD' ),'day'))"
    },
    {
        "filter": "(FirstOrderedOn~gt~datetime'2023-03-30T04:00:00.000Z')",
        "result": "(moment(new Date( x.FirstOrderedOn ),'YYYY-MM-DD').isAfter(moment( '2023-03-30T04:00:00.000Z','YYYY-MM-DD' ),'day'))"
    },
    {
        "filter": "(FirstOrderedOn~gt~datetime'2023-03-30T04:00:00.000Z'~and~FirstOrderedOn~lt~datetime'2023-05-01T04:00:00.000Z')",
        "result": "(moment(new Date( x.FirstOrderedOn ),'YYYY-MM-DD').isAfter(moment( '2023-03-30T04:00:00.000Z','YYYY-MM-DD' ),'day') && moment(new Date( x.FirstOrderedOn ),'YYYY-MM-DD').isBefore(moment( '2023-05-01T04:00:00.000Z','YYYY-MM-DD' ),'day'))"
    }
]

describe('filter string toSQL', () => {
    _(toSqlCases).forEach(c => {
        const {filter, result} = c;

        test(`parse '${filter}' to sql`, () => {
            const testResult = toSQL(filter);
            console.log(testResult);
            expect(testResult).toBe(result);
        });
    });

    _(lodashCases).forEach(c=>{
        const {filter,result}=c;
        
        test(`parse '${filter}' to lodash`,()=>{
            const testResult=toLodash(filter);
            console.log(testResult);
            expect(testResult).toBe(result);
        });
    });
});
