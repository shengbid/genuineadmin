import { Request, Response } from 'express';
import { parse } from 'url';

const valueEnum = {
  0: 'loading',
  1: 'running',
  2: 'online',
  3: 'success',
};
const genList = (current: number, pageSize: number) => {
  const table: any[] = [];
  for (let i = 0; i < pageSize; i++) {
    const index = (current - 1) * 10 + i;
    table.push({
      key: index,
      name: `张三${index}`,
      phone: '13567898767',
      wechart: '1356788997',
      sex: Math.floor(i % 2),
      time: Date.now() - Math.floor(Math.random() * 100000),
      age: Math.round(Math.random() * 100),
      desc: '描述',
      status: valueEnum[Math.floor(i % 2)],
    });
  }
  table.reverse();
  return table;
};

let tableListDataSource = genList(1, 100);
function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query;

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

export default {
  'GET /api/query/user/list': getRule,
};
