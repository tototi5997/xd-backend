export enum MainAttribute {
  JY, // ji yun
  BJ, // bao ji
  FJ, // fan ji
  SB, // shan bi
  XX, // xi xue
  LJ, // lian ji
  KY, // kang yun
  KBJ, // kang bao ji
  KFJ, // kang fan ji
  KSB, // kang shan bi
  KXX, // kang xi xue
  KLJ, // kang lian ji
}

export enum SubAttribute {
  JS, // jian shang
  ZS, // zeng shang
  RL, // ruo ling
  QL, // qiang ling
  RLA, // ruo liao
  QLA, // qiang liao
  BS, // bao shang
  GJ, // gong ji
}

export const MainAttrMap: Record<number, string> = {
  0: '击晕',
  1: '暴击',
  2: '反击',
  3: '闪避',
  4: '吸血',
  5: '连击',
  6: '抗晕',
  7: '抗暴击',
  8: '抗反击',
  9: '抗闪比',
  10: '抗吸血',
  11: '抗连击',
};

export const SubAttrMap: Record<number, string> = {
  0: '减伤',
  1: '增伤',
  2: '弱灵',
  3: '强灵',
  4: '弱疗',
  5: '强疗',
  6: '暴伤',
  7: '攻击',
};

export interface Deciple {
  id?: number;
  ownerId: number;
  mian_attribute_id?: MainAttribute;
  mian_attribute_val?: number;
  sub_attributes?: SubAttribute[];
  sub_attributes_val?: number[];
}

export interface DecipleWantFor extends Deciple {
  want_for_main?: MainAttribute;
  want_for_main_val?: number;
  want_for_sub?: SubAttribute[];
}

export type DiscipleQueryParams = {
  // 主属性
  mian_attribute_id?: MainAttribute;
  // 主属性数值
  mian_attribute_val?: number;
  // 拥有者
  owner_id?: number;
  index?: number;
  pageSize?: number;
};
