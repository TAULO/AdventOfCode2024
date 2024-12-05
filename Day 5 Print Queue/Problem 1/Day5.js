import {fileReader} from '../../Helper.js'

const data = await fileReader('Input.txt');

const [pages, orderingRules] = data.split("\n\n")

const firstRule = orderingRules.split("\n")[3].split(",")

function getValidRules(currentRule) {
    return pages.split('\n').filter((rules, index) => {
        const [rule1, rule2] = rules.split('|')

        return currentRule.includes(rule1) && currentRule.includes(rule2)
    }).map(rule => {
        return rule.split("|")[0]
    })
}

function isArrayEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2)
}

function countRules(currentRule, validRules) {
    let res = []
    for (let i = 0; i < currentRule.length; i++) {
        let count = 0;
        for (let j = 0; j < validRules.length; j++) {
            if (currentRule[i] === validRules[j]) {
                count++
            }
        }
        res.push({
            rules: currentRule[i],
            count
        })
    }

    return res
}

const rules = orderingRules.split("\n").map(rule => rule.split(","))

const res = rules.filter(rule => {

    const validRules = getValidRules(rule)
    const rulesCount = countRules(rule, validRules)

    const rulesSorted = rulesCount.sort((a, b) => b.count - a.count).map((rule) => rule.rules)

    return isArrayEqual(rulesSorted, rule)
}).map(rule => parseInt(rule[Math.floor(rule.length / 2)])).reduce((acc, rule) => acc + rule, 0);

console.log(res) // 3608

