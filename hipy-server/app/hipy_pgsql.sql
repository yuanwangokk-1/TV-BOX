/*
 Navicat Premium Data Transfer

 Source Server         : 本地pg
 Source Server Type    : PostgreSQL
 Source Server Version : 120000
 Source Host           : localhost:5432
 Source Catalog        : hipy
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120000
 File Encoding         : 65001

 Date: 06/01/2024 14:19:58
*/


-- ----------------------------
-- Sequence structure for t_config_settings_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_config_settings_id_seq";
CREATE SEQUENCE "public"."t_config_settings_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_dict_data_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_dict_data_id_seq";
CREATE SEQUENCE "public"."t_dict_data_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_dict_details_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_dict_details_id_seq";
CREATE SEQUENCE "public"."t_dict_details_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_hiker_developer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_hiker_developer_id_seq";
CREATE SEQUENCE "public"."t_hiker_developer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_hiker_rule_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_hiker_rule_id_seq";
CREATE SEQUENCE "public"."t_hiker_rule_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_hiker_rule_type_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_hiker_rule_type_id_seq";
CREATE SEQUENCE "public"."t_hiker_rule_type_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_job_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_job_id_seq";
CREATE SEQUENCE "public"."t_job_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_job_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_job_log_id_seq";
CREATE SEQUENCE "public"."t_job_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_login_infor_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_login_infor_id_seq";
CREATE SEQUENCE "public"."t_login_infor_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_menus_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_menus_id_seq";
CREATE SEQUENCE "public"."t_menus_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_perm_label_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_perm_label_id_seq";
CREATE SEQUENCE "public"."t_perm_label_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_perm_label_role_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_perm_label_role_id_seq";
CREATE SEQUENCE "public"."t_perm_label_role_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_role_menu_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_role_menu_id_seq";
CREATE SEQUENCE "public"."t_role_menu_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_roles_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_roles_id_seq";
CREATE SEQUENCE "public"."t_roles_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_user_role_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_user_role_id_seq";
CREATE SEQUENCE "public"."t_user_role_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for t_users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."t_users_id_seq";
CREATE SEQUENCE "public"."t_users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for t_config_settings
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_config_settings";
CREATE TABLE "public"."t_config_settings" (
  "id" int4 NOT NULL DEFAULT nextval('t_config_settings_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "name" varchar(64) COLLATE "pg_catalog"."default" NOT NULL DEFAULT ''::character varying,
  "key" varchar(128) COLLATE "pg_catalog"."default" NOT NULL,
  "value" varchar(128) COLLATE "pg_catalog"."default" NOT NULL,
  "remark" varchar(256) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "status" int4 DEFAULT 0,
  "order_num" int4 DEFAULT 0
)
;
COMMENT ON COLUMN "public"."t_config_settings"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_config_settings"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_config_settings"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_config_settings"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_config_settings"."is_deleted" IS '逻辑删除:0=未删除,1=删除';
COMMENT ON COLUMN "public"."t_config_settings"."name" IS '参数名称';
COMMENT ON COLUMN "public"."t_config_settings"."key" IS '参数键名';
COMMENT ON COLUMN "public"."t_config_settings"."value" IS '参数键值';
COMMENT ON COLUMN "public"."t_config_settings"."remark" IS '备注';
COMMENT ON COLUMN "public"."t_config_settings"."status" IS '状态 0: 正常  1:停用';
COMMENT ON COLUMN "public"."t_config_settings"."order_num" IS '排序';

-- ----------------------------
-- Records of t_config_settings
-- ----------------------------
INSERT INTO "public"."t_config_settings" VALUES (1, '2022-11-13 02:47:53', 0, '2022-11-13 02:47:53', 0, 0, '用户初始角色', 'user_init_roles', 'general', '0', 0, 1);
INSERT INTO "public"."t_config_settings" VALUES (2, '2023-12-04 22:13:09', 1, '2023-12-09 12:29:32', 1, 0, '数据库升级密码', 'database_update_auth', 'hjdhnx', '默认密码hjdhnx', 0, 2);
INSERT INTO "public"."t_config_settings" VALUES (3, '2023-12-04 23:04:31', 1, '2023-12-11 22:28:56', 1, 0, '登录需要验证码', 'login_with_captcha', 'no', 'yes 开启 no 关闭', 0, 3);
INSERT INTO "public"."t_config_settings" VALUES (4, '2023-12-09 12:53:44', 0, '2024-01-02 22:14:43', 1, 0, '登录日志记录验证码错误', 'log_captcha_error', '0', '0/false不记录 1/true记录', 0, 4);
INSERT INTO "public"."t_config_settings" VALUES (5, '2023-12-10 16:19:44', 1, '2023-12-10 16:20:17', 1, 1, '定时任务启动状态', 'sys_job_status', '0', '0 暂停 1 运行', 0, 12);
INSERT INTO "public"."t_config_settings" VALUES (6, '2024-01-02 22:10:13', 1, '2024-01-02 22:14:30', 1, 0, '用户初始密码', 'default_password', '123456', '用户表导入的时候按这个密码创建用户记录', 0, 1);

-- ----------------------------
-- Table structure for t_dict_data
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_dict_data";
CREATE TABLE "public"."t_dict_data" (
  "id" int4 NOT NULL DEFAULT nextval('t_dict_data_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "dict_type" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "dict_name" varchar(64) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "remark" varchar(256) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "status" int4 DEFAULT 0,
  "order_num" int4 DEFAULT 0
)
;
COMMENT ON COLUMN "public"."t_dict_data"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_dict_data"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_dict_data"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_dict_data"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_dict_data"."is_deleted" IS '逻辑删除:0=未删除,1=删除';
COMMENT ON COLUMN "public"."t_dict_data"."dict_type" IS '字典类型';
COMMENT ON COLUMN "public"."t_dict_data"."dict_name" IS '字典名称';
COMMENT ON COLUMN "public"."t_dict_data"."remark" IS '备注';
COMMENT ON COLUMN "public"."t_dict_data"."status" IS '状态 0: 正常  1:停用';
COMMENT ON COLUMN "public"."t_dict_data"."order_num" IS '排序';

-- ----------------------------
-- Records of t_dict_data
-- ----------------------------
INSERT INTO "public"."t_dict_data" VALUES (1, '2022-11-13 02:49:40', 0, '2022-11-13 02:49:40', 0, 0, 'permission_user_sex', '用户性别', '(0: 未知; 1: 男; 2: 女)', 0, 1);
INSERT INTO "public"."t_dict_data" VALUES (2, '2022-11-13 02:49:40', 0, '2022-11-13 02:49:40', 0, 0, 'com_default_status', '通用状态字典', '(0: 正常; 1: 停用)', 0, 2);
INSERT INTO "public"."t_dict_data" VALUES (3, '2022-11-13 02:49:40', 0, '2023-12-02 15:40:02', 1, 0, 'permission_user_status', '用户状态', NULL, 0, 1);
INSERT INTO "public"."t_dict_data" VALUES (4, '2023-12-04 19:53:00', 1, '2023-12-04 19:57:21', 1, 0, 'hiker_rule_data_type', '海阔视界规则数据类型', '[(''home_rule_url'', ''首页云规则''), (''publish'', ''提交云仓库''), (''js_url'', ''网页插件''),(''html'',''静态页面''),(''config'',''主页配置'')]', 0, 3);
INSERT INTO "public"."t_dict_data" VALUES (5, '2023-12-10 16:20:45', 1, '2023-12-10 16:20:45', 0, 0, 'sys_job_group', '定时任务分组', NULL, 0, 4);
INSERT INTO "public"."t_dict_data" VALUES (6, '2023-12-10 16:21:01', 1, '2023-12-10 16:21:01', 0, 0, 'sys_job_status', '定时任务运行状态', NULL, 0, 5);
INSERT INTO "public"."t_dict_data" VALUES (7, '2024-01-06 12:05:26', 1, '2024-01-06 12:05:26', 0, 0, 'sys_job_run_status', '定时任务调度状态', '1 正常 0 失败', 0, 7);

-- ----------------------------
-- Table structure for t_dict_details
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_dict_details";
CREATE TABLE "public"."t_dict_details" (
  "id" int4 NOT NULL DEFAULT nextval('t_dict_details_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "dict_label" varchar(128) COLLATE "pg_catalog"."default" NOT NULL,
  "dict_disabled" bool NOT NULL DEFAULT false,
  "dict_value" varchar(128) COLLATE "pg_catalog"."default" NOT NULL,
  "remark" varchar(256) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "is_default" bool NOT NULL DEFAULT false,
  "status" int4 DEFAULT 0,
  "order_num" int4 DEFAULT 0,
  "dict_data_id" int4
)
;
COMMENT ON COLUMN "public"."t_dict_details"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_dict_details"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_dict_details"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_dict_details"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_dict_details"."is_deleted" IS '逻辑删除:0=未删除,1=删除';
COMMENT ON COLUMN "public"."t_dict_details"."dict_label" IS '字典标签';
COMMENT ON COLUMN "public"."t_dict_details"."dict_disabled" IS '是否禁用';
COMMENT ON COLUMN "public"."t_dict_details"."dict_value" IS '字典键值';
COMMENT ON COLUMN "public"."t_dict_details"."remark" IS '备注';
COMMENT ON COLUMN "public"."t_dict_details"."is_default" IS '是否默认值';
COMMENT ON COLUMN "public"."t_dict_details"."status" IS '状态 0: 正常  1:停用';
COMMENT ON COLUMN "public"."t_dict_details"."order_num" IS '排序';

-- ----------------------------
-- Records of t_dict_details
-- ----------------------------
INSERT INTO "public"."t_dict_details" VALUES (1, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '未知', 'f', '0', NULL, 't', 0, 1, 1);
INSERT INTO "public"."t_dict_details" VALUES (2, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '男', 'f', '1', NULL, 'f', 0, 2, 1);
INSERT INTO "public"."t_dict_details" VALUES (3, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '女', 'f', '2', NULL, 'f', 0, 3, 1);
INSERT INTO "public"."t_dict_details" VALUES (4, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '正常', 'f', '0', NULL, 't', 0, 0, 2);
INSERT INTO "public"."t_dict_details" VALUES (5, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '停用', 'f', '1', NULL, 'f', 0, 1, 2);
INSERT INTO "public"."t_dict_details" VALUES (6, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '正常', 'f', '0', NULL, 't', 0, 1, 3);
INSERT INTO "public"."t_dict_details" VALUES (7, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '停用', 'f', '1', NULL, 'f', 0, 2, 3);
INSERT INTO "public"."t_dict_details" VALUES (8, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '拉黑', 'f', '2', NULL, 'f', 0, 3, 3);
INSERT INTO "public"."t_dict_details" VALUES (9, '2023-12-04 19:53:35', 1, '2023-12-04 19:53:35', 0, 0, '首页云规则', 'f', 'home_rule_url', NULL, 't', 0, 1, 4);
INSERT INTO "public"."t_dict_details" VALUES (10, '2023-12-04 19:53:56', 1, '2023-12-04 19:58:52', 1, 0, '提交云仓库', 't', 'publish', NULL, 'f', 0, 2, 4);
INSERT INTO "public"."t_dict_details" VALUES (11, '2023-12-04 19:54:20', 1, '2023-12-04 19:54:20', 0, 0, '网页插件', 'f', 'js_url', NULL, 'f', 0, 3, 4);
INSERT INTO "public"."t_dict_details" VALUES (12, '2023-12-04 19:54:35', 1, '2023-12-04 19:54:35', 0, 0, '静态页面', 'f', 'html', NULL, 'f', 0, 4, 4);
INSERT INTO "public"."t_dict_details" VALUES (13, '2023-12-04 19:54:53', 1, '2023-12-04 19:54:53', 0, 0, '主页配置', 'f', 'config', NULL, 'f', 0, 5, 4);
INSERT INTO "public"."t_dict_details" VALUES (14, '2023-12-10 16:21:16', 1, '2023-12-10 16:21:29', 1, 0, '暂停', 'f', '0', NULL, 't', 0, 1, 6);
INSERT INTO "public"."t_dict_details" VALUES (15, '2023-12-10 16:21:22', 1, '2023-12-10 16:21:22', 0, 0, '启动', 'f', '1', NULL, 'f', 0, 2, 6);
INSERT INTO "public"."t_dict_details" VALUES (16, '2023-12-10 16:22:10', 1, '2023-12-10 16:22:43', 1, 0, '单次', 'f', 'setTimeout', NULL, 'f', 0, 1, 5);
INSERT INTO "public"."t_dict_details" VALUES (17, '2023-12-10 16:22:31', 1, '2023-12-10 16:22:58', 1, 0, '循环', 'f', 'setInterval', NULL, 't', 0, 2, 5);
INSERT INTO "public"."t_dict_details" VALUES (18, '2024-01-06 12:05:43', 1, '2024-01-06 12:05:43', 0, 0, '失败', 'f', '0', NULL, 'f', 0, 1, 7);
INSERT INTO "public"."t_dict_details" VALUES (19, '2024-01-06 12:05:52', 1, '2024-01-06 12:05:52', 0, 0, '正常', 'f', '1', NULL, 't', 0, 2, 7);

-- ----------------------------
-- Table structure for t_hiker_developer
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_hiker_developer";
CREATE TABLE "public"."t_hiker_developer" (
  "id" int4 NOT NULL DEFAULT nextval('t_hiker_developer_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "name" varchar(256) COLLATE "pg_catalog"."default" NOT NULL,
  "qq" varchar(11) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(256) COLLATE "pg_catalog"."default" NOT NULL DEFAULT '123456'::character varying,
  "status" int4 DEFAULT 0,
  "is_manager" bool DEFAULT false,
  "active" bool DEFAULT true,
  "test" varchar(10) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."t_hiker_developer"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_hiker_developer"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_hiker_developer"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_hiker_developer"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_hiker_developer"."is_deleted" IS '逻辑删除:0=未删除,1=删除';
COMMENT ON COLUMN "public"."t_hiker_developer"."name" IS '开发者账号';
COMMENT ON COLUMN "public"."t_hiker_developer"."qq" IS 'QQ号';
COMMENT ON COLUMN "public"."t_hiker_developer"."password" IS '开发者密码';
COMMENT ON COLUMN "public"."t_hiker_developer"."status" IS '状态';
COMMENT ON COLUMN "public"."t_hiker_developer"."is_manager" IS '是否超管';
COMMENT ON COLUMN "public"."t_hiker_developer"."active" IS '是否启用';
COMMENT ON COLUMN "public"."t_hiker_developer"."test" IS '测试字段';

-- ----------------------------
-- Records of t_hiker_developer
-- ----------------------------
INSERT INTO "public"."t_hiker_developer" VALUES (1, '2023-12-02 18:00:37', 1, '2023-12-09 16:55:06', 1, 0, '道长', '434857005', '123456789', 0, 'f', 't', NULL);

-- ----------------------------
-- Table structure for t_hiker_rule
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_hiker_rule";
CREATE TABLE "public"."t_hiker_rule" (
  "id" int4 NOT NULL DEFAULT nextval('t_hiker_rule_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "name" varchar(256) COLLATE "pg_catalog"."default",
  "type_id" int4,
  "dev_id" int4,
  "value" text COLLATE "pg_catalog"."default",
  "url" varchar(256) COLLATE "pg_catalog"."default",
  "state" int4 DEFAULT 0,
  "auth" varchar(256) COLLATE "pg_catalog"."default",
  "auth_date_time" timestamp(6) DEFAULT now(),
  "time_over" bool DEFAULT false,
  "b64_value" text COLLATE "pg_catalog"."default",
  "home_url" varchar(256) COLLATE "pg_catalog"."default",
  "pic_url" varchar(256) COLLATE "pg_catalog"."default",
  "is_json" bool DEFAULT true,
  "is_redirect" bool DEFAULT false,
  "is_tap" bool DEFAULT false,
  "can_discuss" bool DEFAULT true,
  "is_json_list" bool DEFAULT false,
  "data_type" varchar(256) COLLATE "pg_catalog"."default" DEFAULT 'home_rule_url'::character varying,
  "version" varchar(256) COLLATE "pg_catalog"."default" DEFAULT '0'::character varying,
  "author" varchar(256) COLLATE "pg_catalog"."default",
  "note" text COLLATE "pg_catalog"."default",
  "good_num" int4 DEFAULT 0,
  "bad_num" int4 DEFAULT 0,
  "reply_num" int4 DEFAULT 0,
  "is_safe" bool DEFAULT true,
  "is_good" bool DEFAULT false,
  "is_white" bool DEFAULT false,
  "not_safe_note" text COLLATE "pg_catalog"."default",
  "last_active" timestamp(6) DEFAULT now()
)
;
COMMENT ON COLUMN "public"."t_hiker_rule"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_hiker_rule"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_hiker_rule"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_hiker_rule"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_hiker_rule"."is_deleted" IS '逻辑删除:0=未删除,1=删除';
COMMENT ON COLUMN "public"."t_hiker_rule"."name" IS '规则名称';
COMMENT ON COLUMN "public"."t_hiker_rule"."type_id" IS '规则类型';
COMMENT ON COLUMN "public"."t_hiker_rule"."dev_id" IS '开发者';
COMMENT ON COLUMN "public"."t_hiker_rule"."value" IS '规则Json';
COMMENT ON COLUMN "public"."t_hiker_rule"."url" IS '地址';
COMMENT ON COLUMN "public"."t_hiker_rule"."state" IS '状态';
COMMENT ON COLUMN "public"."t_hiker_rule"."auth" IS '私有密码';
COMMENT ON COLUMN "public"."t_hiker_rule"."auth_date_time" IS '私有密码过期时间';
COMMENT ON COLUMN "public"."t_hiker_rule"."time_over" IS '私有规则过期';
COMMENT ON COLUMN "public"."t_hiker_rule"."b64_value" IS '64编码';
COMMENT ON COLUMN "public"."t_hiker_rule"."home_url" IS '规则主页链接';
COMMENT ON COLUMN "public"."t_hiker_rule"."pic_url" IS '网站图标链接';
COMMENT ON COLUMN "public"."t_hiker_rule"."is_json" IS '是否json值';
COMMENT ON COLUMN "public"."t_hiker_rule"."is_redirect" IS '是否为后端重定向';
COMMENT ON COLUMN "public"."t_hiker_rule"."is_tap" IS '是否为仓库跳转规则';
COMMENT ON COLUMN "public"."t_hiker_rule"."can_discuss" IS '是否可以互动';
COMMENT ON COLUMN "public"."t_hiker_rule"."is_json_list" IS '是否json列表';
COMMENT ON COLUMN "public"."t_hiker_rule"."data_type" IS '数据类型';
COMMENT ON COLUMN "public"."t_hiker_rule"."version" IS '版本号';
COMMENT ON COLUMN "public"."t_hiker_rule"."author" IS '作者';
COMMENT ON COLUMN "public"."t_hiker_rule"."note" IS '说明';
COMMENT ON COLUMN "public"."t_hiker_rule"."good_num" IS '点赞数';
COMMENT ON COLUMN "public"."t_hiker_rule"."bad_num" IS '踩数';
COMMENT ON COLUMN "public"."t_hiker_rule"."reply_num" IS '回复数';
COMMENT ON COLUMN "public"."t_hiker_rule"."is_safe" IS '是否安全';
COMMENT ON COLUMN "public"."t_hiker_rule"."is_good" IS '是否优质';
COMMENT ON COLUMN "public"."t_hiker_rule"."is_white" IS '是否白名单';
COMMENT ON COLUMN "public"."t_hiker_rule"."not_safe_note" IS '风险描述';
COMMENT ON COLUMN "public"."t_hiker_rule"."last_active" IS '开发者上次提交时间';

-- ----------------------------
-- Records of t_hiker_rule
-- ----------------------------
INSERT INTO "public"."t_hiker_rule" VALUES (1, '2023-12-04 20:00:34', 1, '2023-12-09 16:54:53', 1, 0, '道德经', 1, 1, '"{\"name\":\"道德经\"}"', 'hiker://empty#', 1, NULL, '2023-12-04 20:00:34', 'f', NULL, NULL, NULL, 't', 'f', 'f', 't', 'f', 'home_rule_url', '1', '道长', NULL, 1, 1, 1, 't', 't', 't', NULL, '2023-12-04 20:00:34');

-- ----------------------------
-- Table structure for t_hiker_rule_type
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_hiker_rule_type";
CREATE TABLE "public"."t_hiker_rule_type" (
  "id" int4 NOT NULL DEFAULT nextval('t_hiker_rule_type_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "name" varchar(256) COLLATE "pg_catalog"."default" NOT NULL,
  "count_num" int4 DEFAULT 0,
  "active" bool DEFAULT true
)
;
COMMENT ON COLUMN "public"."t_hiker_rule_type"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_hiker_rule_type"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_hiker_rule_type"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_hiker_rule_type"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_hiker_rule_type"."is_deleted" IS '逻辑删除:0=未删除,1=删除';
COMMENT ON COLUMN "public"."t_hiker_rule_type"."name" IS '分类名称';
COMMENT ON COLUMN "public"."t_hiker_rule_type"."count_num" IS '数目';
COMMENT ON COLUMN "public"."t_hiker_rule_type"."active" IS '是否启用';

-- ----------------------------
-- Records of t_hiker_rule_type
-- ----------------------------
INSERT INTO "public"."t_hiker_rule_type" VALUES (1, '2023-12-04 19:55:50', 1, '2023-12-09 16:55:14', 1, 0, '影视', 2, 't');
INSERT INTO "public"."t_hiker_rule_type" VALUES (2, '2023-12-05 22:52:36', 1, '2023-12-09 16:55:12', 1, 0, '电影2', 3, 't');

-- ----------------------------
-- Table structure for t_job
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_job";
CREATE TABLE "public"."t_job" (
  "id" int4 NOT NULL DEFAULT nextval('t_job_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "job_id" varchar(256) COLLATE "pg_catalog"."default",
  "job_name" varchar(256) COLLATE "pg_catalog"."default" NOT NULL,
  "job_group" varchar(256) COLLATE "pg_catalog"."default",
  "func_name" varchar(256) COLLATE "pg_catalog"."default",
  "func_args" varchar(256) COLLATE "pg_catalog"."default",
  "func_kwargs" varchar(256) COLLATE "pg_catalog"."default",
  "cron_model" varchar(256) COLLATE "pg_catalog"."default",
  "coalesce" int4 DEFAULT 0,
  "next_run" timestamp(6),
  "cron_expression" varchar(256) COLLATE "pg_catalog"."default",
  "status" int4 DEFAULT 0,
  "misfire_policy" int4 DEFAULT 0,
  "active" bool DEFAULT true
)
;
COMMENT ON COLUMN "public"."t_job"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_job"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_job"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_job"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_job"."is_deleted" IS '逻辑删除:0=未删除,1=删除';
COMMENT ON COLUMN "public"."t_job"."job_id" IS '任务代号';
COMMENT ON COLUMN "public"."t_job"."job_name" IS '任务名称';
COMMENT ON COLUMN "public"."t_job"."job_group" IS '任务组名';
COMMENT ON COLUMN "public"."t_job"."func_name" IS '调用目标字符串';
COMMENT ON COLUMN "public"."t_job"."func_args" IS '传入位置参数';
COMMENT ON COLUMN "public"."t_job"."func_kwargs" IS '传入字典参数';
COMMENT ON COLUMN "public"."t_job"."cron_model" IS '执行模式';
COMMENT ON COLUMN "public"."t_job"."coalesce" IS '是否并发';
COMMENT ON COLUMN "public"."t_job"."next_run" IS '下次执行时间';
COMMENT ON COLUMN "public"."t_job"."cron_expression" IS 'cron执行表达式';
COMMENT ON COLUMN "public"."t_job"."status" IS '任务状态';
COMMENT ON COLUMN "public"."t_job"."misfire_policy" IS '执行策略';
COMMENT ON COLUMN "public"."t_job"."active" IS '是否启用';

-- ----------------------------
-- Records of t_job
-- ----------------------------
INSERT INTO "public"."t_job" VALUES (14, '2023-12-13 00:26:59', 1, '2024-01-06 06:19:22.497404', 1, 0, 'demo2', '测试2', 'setInterval', 'tasks.demo_task.demo', '[''哈哈哈哈哈'']', '{''key'':''你好吗''}', 'cron', 0, '2024-01-06 14:19:32.520366', '30 10 * * * ?', 1, 1, 't');
INSERT INTO "public"."t_job" VALUES (15, '2023-12-13 00:53:05', 1, '2024-01-06 06:19:22.497404', 1, 0, 'kzz', '可转债打新查询', 'setInterval', 'tasks.kzz_spider.get_now_kzz', NULL, '{''dayeExtra'':8}', 'cron', 0, '2024-01-06 14:19:32.522994', '0 0 8 1/1 * ?', 1, 1, 't');
INSERT INTO "public"."t_job" VALUES (1, '2023-12-10 21:31:19', 1, '2024-01-06 06:19:22.497404', 1, 0, 'demo', '测试', 'setInterval', 'tasks.demo_task.demo', '[''hello world'']', '{''a'':''1'',''b'':''2''}', 'cron', 0, '2024-01-06 14:19:32.49851', '30 20 * * * ?', 1, 1, 't');

-- ----------------------------
-- Table structure for t_job_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_job_log";
CREATE TABLE "public"."t_job_log" (
  "id" int4 NOT NULL DEFAULT nextval('t_job_log_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "job_id" varchar(256) COLLATE "pg_catalog"."default",
  "job_name" varchar(256) COLLATE "pg_catalog"."default" NOT NULL,
  "job_group" varchar(256) COLLATE "pg_catalog"."default",
  "func_name" varchar(256) COLLATE "pg_catalog"."default",
  "func_args" varchar(256) COLLATE "pg_catalog"."default",
  "func_kwargs" varchar(256) COLLATE "pg_catalog"."default",
  "run_info" text COLLATE "pg_catalog"."default",
  "run_except_info" text COLLATE "pg_catalog"."default",
  "run_status" int4 DEFAULT 0,
  "run_time" timestamp(6)
)
;
COMMENT ON COLUMN "public"."t_job_log"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_job_log"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_job_log"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_job_log"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_job_log"."is_deleted" IS '逻辑删除:0=未删除,1=删除';
COMMENT ON COLUMN "public"."t_job_log"."job_id" IS '任务代号';
COMMENT ON COLUMN "public"."t_job_log"."job_name" IS '任务名称';
COMMENT ON COLUMN "public"."t_job_log"."job_group" IS '任务组名';
COMMENT ON COLUMN "public"."t_job_log"."func_name" IS '调用目标字符串';
COMMENT ON COLUMN "public"."t_job_log"."func_args" IS '传入位置参数';
COMMENT ON COLUMN "public"."t_job_log"."func_kwargs" IS '传入字典参数';
COMMENT ON COLUMN "public"."t_job_log"."run_info" IS '正常日志信息';
COMMENT ON COLUMN "public"."t_job_log"."run_except_info" IS '异常日志信息';
COMMENT ON COLUMN "public"."t_job_log"."run_status" IS '执行状态';
COMMENT ON COLUMN "public"."t_job_log"."run_time" IS '执行时间';

-- ----------------------------
-- Records of t_job_log
-- ----------------------------
INSERT INTO "public"."t_job_log" VALUES (34, '2024-01-06 13:43:41', 0, '2024-01-06 13:43:41', 0, 0, 'demo2', '测试2', 'setInterval', 'tasks.demo_task.demo', '[''哈哈哈哈哈'']', '{''key'':''你好吗''}', '----------------task_id:demo2,args:(''哈哈哈哈哈'',),kwargs:{''key'': ''你好吗''}----------------', NULL, 1, '2024-01-06 13:43:41');
INSERT INTO "public"."t_job_log" VALUES (35, '2024-01-06 13:43:45', 0, '2024-01-06 13:43:45', 0, 0, 'demo', '测试', 'setInterval', 'tasks.demo_task.demo', '[''hello world'']', '{''a'':''1'',''b'':''2''}', '----------------task_id:demo,args:(''hello world'',),kwargs:{''a'': ''1'', ''b'': ''2''}----------------', NULL, 1, '2024-01-06 13:43:45');
INSERT INTO "public"."t_job_log" VALUES (36, '2024-01-06 13:43:48', 0, '2024-01-06 13:43:48', 0, 0, 'kzz', '可转债打新查询', 'setInterval', 'tasks.kzz_spider.get_now_kzz', NULL, '{''dayeExtra'':8}', '[]', NULL, 1, '2024-01-06 13:43:48');

-- ----------------------------
-- Table structure for t_login_infor
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_login_infor";
CREATE TABLE "public"."t_login_infor" (
  "id" int4 NOT NULL DEFAULT nextval('t_login_infor_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "user_name" varchar(256) COLLATE "pg_catalog"."default" NOT NULL,
  "ipaddr" varchar(256) COLLATE "pg_catalog"."default",
  "login_location" varchar(256) COLLATE "pg_catalog"."default",
  "browser" varchar(256) COLLATE "pg_catalog"."default",
  "os" varchar(256) COLLATE "pg_catalog"."default",
  "status" int4 DEFAULT 0,
  "msg" varchar(256) COLLATE "pg_catalog"."default",
  "login_time" timestamp(6) DEFAULT now()
)
;
COMMENT ON COLUMN "public"."t_login_infor"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_login_infor"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_login_infor"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_login_infor"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_login_infor"."is_deleted" IS '逻辑删除:0=未删除,1=删除';
COMMENT ON COLUMN "public"."t_login_infor"."user_name" IS '用户名称';
COMMENT ON COLUMN "public"."t_login_infor"."ipaddr" IS '登录地址';
COMMENT ON COLUMN "public"."t_login_infor"."login_location" IS '登录地点';
COMMENT ON COLUMN "public"."t_login_infor"."browser" IS '浏览器';
COMMENT ON COLUMN "public"."t_login_infor"."os" IS '操作系统';
COMMENT ON COLUMN "public"."t_login_infor"."status" IS '登录状态';
COMMENT ON COLUMN "public"."t_login_infor"."msg" IS '操作信息';
COMMENT ON COLUMN "public"."t_login_infor"."login_time" IS '登录日期';

-- ----------------------------
-- Records of t_login_infor
-- ----------------------------
INSERT INTO "public"."t_login_infor" VALUES (88, '2023-12-13 21:58:49', 0, '2023-12-13 21:58:49', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-13 21:58:49');
INSERT INTO "public"."t_login_infor" VALUES (87, '2023-12-13 00:51:25', 0, '2023-12-13 00:51:25', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-13 00:51:25');
INSERT INTO "public"."t_login_infor" VALUES (86, '2023-12-13 00:21:12', 0, '2023-12-13 00:21:12', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-13 00:21:12');
INSERT INTO "public"."t_login_infor" VALUES (85, '2023-12-12 23:50:22', 0, '2023-12-12 23:50:22', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-12 23:50:22');
INSERT INTO "public"."t_login_infor" VALUES (84, '2023-12-12 23:50:21', 0, '2023-12-12 23:50:21', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-12 23:50:21');
INSERT INTO "public"."t_login_infor" VALUES (83, '2023-12-12 23:19:26', 0, '2023-12-12 23:19:26', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-12 23:19:26');
INSERT INTO "public"."t_login_infor" VALUES (82, '2023-12-12 22:49:02', 0, '2023-12-12 22:49:02', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-12 22:49:02');
INSERT INTO "public"."t_login_infor" VALUES (81, '2023-12-11 22:58:38', 0, '2023-12-11 22:58:38', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-11 22:58:38');
INSERT INTO "public"."t_login_infor" VALUES (80, '2023-12-11 22:27:14', 0, '2023-12-11 22:27:14', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-11 22:27:14');
INSERT INTO "public"."t_login_infor" VALUES (79, '2023-12-11 21:51:01', 0, '2023-12-11 21:51:01', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-11 21:51:01');
INSERT INTO "public"."t_login_infor" VALUES (73, '2023-12-10 22:40:50', 0, '2023-12-10 22:40:50', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-10 22:40:50');
INSERT INTO "public"."t_login_infor" VALUES (74, '2023-12-10 23:11:02', 0, '2023-12-10 23:11:02', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-10 23:11:02');
INSERT INTO "public"."t_login_infor" VALUES (75, '2023-12-11 20:16:51', 0, '2023-12-11 20:16:51', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-11 20:16:51');
INSERT INTO "public"."t_login_infor" VALUES (76, '2023-12-11 20:34:36', 0, '2023-12-11 20:34:36', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-11 20:34:36');
INSERT INTO "public"."t_login_infor" VALUES (77, '2023-12-11 20:36:15', 0, '2023-12-11 20:36:15', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-11 20:36:15');
INSERT INTO "public"."t_login_infor" VALUES (78, '2023-12-11 21:15:50', 0, '2023-12-11 21:15:50', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-11 21:15:50');
INSERT INTO "public"."t_login_infor" VALUES (89, '2023-12-14 22:54:21', 0, '2023-12-14 22:54:21', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-14 22:54:21');
INSERT INTO "public"."t_login_infor" VALUES (90, '2023-12-16 10:43:12', 0, '2023-12-16 10:43:12', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-16 10:43:12');
INSERT INTO "public"."t_login_infor" VALUES (91, '2023-12-16 11:36:26', 0, '2023-12-16 11:36:26', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 1, '密码错误', '2023-12-16 11:36:26');
INSERT INTO "public"."t_login_infor" VALUES (92, '2023-12-16 11:36:29', 0, '2023-12-16 11:36:29', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 1, '用户账号尚未激活', '2023-12-16 11:36:29');
INSERT INTO "public"."t_login_infor" VALUES (93, '2023-12-16 11:36:47', 0, '2023-12-16 11:36:47', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-16 11:36:47');
INSERT INTO "public"."t_login_infor" VALUES (94, '2023-12-16 12:47:42', 0, '2023-12-16 12:47:42', 0, 0, 'admin', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-16 12:47:42');
INSERT INTO "public"."t_login_infor" VALUES (95, '2023-12-16 12:50:11', 0, '2023-12-16 12:50:11', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-16 12:50:11');
INSERT INTO "public"."t_login_infor" VALUES (96, '2023-12-17 13:49:34', 0, '2023-12-17 13:49:34', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 13:49:34');
INSERT INTO "public"."t_login_infor" VALUES (97, '2023-12-17 13:49:42', 0, '2023-12-17 13:49:42', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 13:49:42');
INSERT INTO "public"."t_login_infor" VALUES (98, '2023-12-17 14:11:13', 0, '2023-12-17 14:11:13', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 14:11:13');
INSERT INTO "public"."t_login_infor" VALUES (99, '2023-12-17 14:51:31', 0, '2023-12-17 14:51:31', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 14:51:31');
INSERT INTO "public"."t_login_infor" VALUES (100, '2023-12-17 14:58:45', 0, '2023-12-17 14:58:45', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 14:58:45');
INSERT INTO "public"."t_login_infor" VALUES (101, '2023-12-17 15:33:10', 0, '2023-12-17 15:33:10', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 15:33:10');
INSERT INTO "public"."t_login_infor" VALUES (102, '2023-12-17 15:37:34', 0, '2023-12-17 15:37:34', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 15:37:34');
INSERT INTO "public"."t_login_infor" VALUES (103, '2023-12-17 15:47:12', 0, '2023-12-17 15:47:12', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 15:47:12');
INSERT INTO "public"."t_login_infor" VALUES (104, '2023-12-17 16:49:11', 0, '2023-12-17 16:49:11', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 16:49:11');
INSERT INTO "public"."t_login_infor" VALUES (105, '2023-12-17 16:49:27', 0, '2023-12-17 16:49:27', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 16:49:27');
INSERT INTO "public"."t_login_infor" VALUES (106, '2023-12-17 16:53:08', 0, '2023-12-17 16:53:08', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 16:53:08');
INSERT INTO "public"."t_login_infor" VALUES (107, '2023-12-17 16:55:32', 0, '2023-12-17 16:55:32', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 16:55:32');
INSERT INTO "public"."t_login_infor" VALUES (108, '2023-12-17 17:01:24', 0, '2023-12-17 17:01:24', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 17:01:24');
INSERT INTO "public"."t_login_infor" VALUES (109, '2023-12-17 17:01:45', 0, '2023-12-17 17:01:45', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 17:01:45');
INSERT INTO "public"."t_login_infor" VALUES (110, '2023-12-17 17:01:54', 0, '2023-12-17 17:01:54', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 17:01:54');
INSERT INTO "public"."t_login_infor" VALUES (111, '2023-12-17 17:05:01', 0, '2023-12-17 17:05:01', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 17:05:01');
INSERT INTO "public"."t_login_infor" VALUES (112, '2023-12-20 19:51:10', 0, '2023-12-20 19:51:10', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-20 19:51:10');
INSERT INTO "public"."t_login_infor" VALUES (113, '2023-12-20 22:09:51', 0, '2023-12-20 22:09:51', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-20 22:09:51');
INSERT INTO "public"."t_login_infor" VALUES (114, '2023-12-28 21:23:12', 0, '2023-12-28 21:23:12', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-28 21:23:12');
INSERT INTO "public"."t_login_infor" VALUES (115, '2024-01-02 20:24:17', 0, '2024-01-02 20:24:17', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2024-01-02 20:24:17');
INSERT INTO "public"."t_login_infor" VALUES (116, '2024-01-02 21:48:03', 0, '2024-01-02 21:48:03', 0, 0, 'admin2', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2024-01-02 21:48:03');
INSERT INTO "public"."t_login_infor" VALUES (117, '2024-01-02 22:12:01', 0, '2024-01-02 22:12:01', 0, 0, 'admin1', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2024-01-02 22:12:01');
INSERT INTO "public"."t_login_infor" VALUES (118, '2024-01-02 22:12:13', 0, '2024-01-02 22:12:13', 0, 0, 'admin2', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 1, '密码错误', '2024-01-02 22:12:13');
INSERT INTO "public"."t_login_infor" VALUES (119, '2024-01-02 22:12:17', 0, '2024-01-02 22:12:17', 0, 0, 'admin2', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2024-01-02 22:12:17');
INSERT INTO "public"."t_login_infor" VALUES (120, '2024-01-06 11:14:03', 0, '2024-01-06 11:14:03', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2024-01-06 11:14:03');

-- ----------------------------
-- Table structure for t_menus
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_menus";
CREATE TABLE "public"."t_menus" (
  "id" int4 NOT NULL DEFAULT nextval('t_menus_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "path" varchar(128) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "component" varchar(128) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "is_frame" bool DEFAULT false,
  "hidden" bool DEFAULT false,
  "status" int4 DEFAULT 0,
  "order_num" int4 DEFAULT 0,
  "name" varchar(32) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "title" varchar(32) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "icon" varchar(32) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "no_cache" bool DEFAULT false,
  "parent_id" int4 DEFAULT 0
)
;
COMMENT ON COLUMN "public"."t_menus"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_menus"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_menus"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_menus"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_menus"."is_deleted" IS '逻辑删除:0=未删除,1=删除';
COMMENT ON COLUMN "public"."t_menus"."path" IS '路由';
COMMENT ON COLUMN "public"."t_menus"."component" IS '组件';
COMMENT ON COLUMN "public"."t_menus"."is_frame" IS '是否外链';
COMMENT ON COLUMN "public"."t_menus"."hidden" IS '是否隐藏';
COMMENT ON COLUMN "public"."t_menus"."status" IS '菜单状态';
COMMENT ON COLUMN "public"."t_menus"."order_num" IS '显示排序';
COMMENT ON COLUMN "public"."t_menus"."name" IS '唯一标识用于页面缓存，否则keep-alive会出问题';
COMMENT ON COLUMN "public"."t_menus"."title" IS '标题';
COMMENT ON COLUMN "public"."t_menus"."icon" IS '图标';
COMMENT ON COLUMN "public"."t_menus"."no_cache" IS '是否缓存';
COMMENT ON COLUMN "public"."t_menus"."parent_id" IS '上级菜单';

-- ----------------------------
-- Records of t_menus
-- ----------------------------
INSERT INTO "public"."t_menus" VALUES (1, '2022-07-14 03:56:19', 0, '2022-07-19 15:40:51', 0, 0, 'role', '/permission/role/index', 'f', 'f', 0, 3, 'PermissionRole', '角色管理', 'peoples', 't', 7);
INSERT INTO "public"."t_menus" VALUES (2, '2022-07-14 03:56:19', 0, '2022-07-20 10:25:17', 0, 0, '/system', '', 'f', 'f', 0, 2, '', '系统管理', 'system', 'f', 0);
INSERT INTO "public"."t_menus" VALUES (3, '2022-07-14 03:56:19', 0, '2022-07-19 16:03:40', 0, 0, 'menu', '/permission/menu/index', 'f', 'f', 0, 2, 'PermissionMenu', '菜单管理', 'tree-table', 'f', 7);
INSERT INTO "public"."t_menus" VALUES (4, '2022-07-14 03:56:19', 0, '2022-07-14 03:56:19', 0, 0, 'dict', '/system/dict/index', 'f', 'f', 0, 4, 'SystemDictType', '字典管理', 'dict', 'f', 2);
INSERT INTO "public"."t_menus" VALUES (5, '2022-07-14 03:56:19', 0, '2022-07-14 03:56:19', 0, 0, 'parameter', '/system/parameter/index', 'f', 'f', 0, 3, 'SystemParameter', '参数管理', 'tree', 'f', 2);
INSERT INTO "public"."t_menus" VALUES (6, '2022-07-14 03:56:19', 0, '2022-07-19 16:03:33', 0, 0, 'user', '/permission/user/index', 'f', 'f', 0, 1, 'PermissionUser', '用户管理', 'user', 'f', 7);
INSERT INTO "public"."t_menus" VALUES (7, '2022-07-14 03:56:19', 0, '2022-07-20 10:25:24', 0, 0, '/permission', '', 'f', 'f', 0, 1, '', '权限管理', 'monitor', 'f', 0);
INSERT INTO "public"."t_menus" VALUES (8, '2022-07-14 03:56:19', 0, '2022-07-14 03:56:19', 0, 0, 'dict/detail/:id(\d+)', '/system/dict/detail/index', 'f', 't', 0, 1, 'SystemDictDetail', '字典参数', 'dashboard', 'f', 2);
INSERT INTO "public"."t_menus" VALUES (9, '2022-10-29 23:57:16', 0, '2022-10-29 23:57:16', 0, 0, 'label', '/permission/label/index', 'f', 'f', 0, 4, 'PermissionLabel', '权限标签', 'icon', 't', 7);
INSERT INTO "public"."t_menus" VALUES (11, '2023-12-02 18:06:51', 0, '2023-12-07 22:10:46', 1, 0, 'developer', '/hiker/developer/index', 'f', 'f', 0, 1, 'HikerDeveloper', '开发者', 'peoples', 't', 10);
INSERT INTO "public"."t_menus" VALUES (10, '2023-12-02 18:05:43', 0, '2023-12-02 18:05:43', 0, 0, '/hiker', '', 'f', 'f', 0, 3, '', '海阔视界', 'international', 't', 0);
INSERT INTO "public"."t_menus" VALUES (12, '2023-12-02 23:23:55', 1, '2023-12-07 22:10:55', 1, 0, 'rule_type', '/hiker/rule_type/index', 'f', 'f', 0, 2, 'HikerRuleType', '规则类型', 'component', 't', 10);
INSERT INTO "public"."t_menus" VALUES (13, '2023-12-03 19:03:50', 1, '2023-12-07 22:11:07', 1, 0, 'rule', '/hiker/rule/index', 'f', 'f', 0, 3, 'HikerRule', '规则', 'list', 't', 10);
INSERT INTO "public"."t_menus" VALUES (14, '2023-12-04 21:49:25', 1, '2023-12-04 21:49:25', 0, 0, 'control_panel', '/control_panel/index', 'f', 'f', 0, 4, 'ControlPanel', '控制面板', 'swagger', 't', 2);
INSERT INTO "public"."t_menus" VALUES (15, '2023-12-05 08:49:37', 1, '2023-12-05 08:50:03', 1, 0, '/tool', '', 'f', 'f', 0, 4, '', '工具', 'bug', 't', 0);
INSERT INTO "public"."t_menus" VALUES (16, '2023-12-05 08:51:06', 1, '2023-12-05 08:52:00', 1, 0, 'swagger', '/tool/swagger/index', 'f', 'f', 0, 1, 'Swagger', 'swagger', 'swagger', 't', 15);
INSERT INTO "public"."t_menus" VALUES (17, '2023-12-05 09:08:13', 1, '2023-12-06 22:50:59', 1, 0, '/monitor', '', 'f', 'f', 0, 4, '', '系统监控', 'monitor', 't', 0);
INSERT INTO "public"."t_menus" VALUES (18, '2023-12-05 09:09:57', 1, '2023-12-07 00:03:28', 1, 0, 'job', '/monitor/job/index', 'f', 'f', 0, 2, 'Job', '定时任务', 'time-range', 't', 17);
INSERT INTO "public"."t_menus" VALUES (19, '2023-12-05 09:11:12', 1, '2023-12-07 00:03:23', 1, 0, 'server', '/monitor/server/index', 'f', 'f', 0, 1, 'Server', '服务监控', 'server', 't', 17);
INSERT INTO "public"."t_menus" VALUES (20, '2023-12-06 22:49:09', 1, '2023-12-06 22:49:09', 0, 0, 'blog', '/tool/blog/index', 'f', 'f', 0, 2, 'Blog', '博客', 'log', 't', 15);
INSERT INTO "public"."t_menus" VALUES (21, '2023-12-06 22:53:25', 1, '2023-12-15 00:17:28', 1, 0, 'online', '/monitor/online/index', 'f', 't', 0, 6, 'Online', '在线用户', 'online', 't', 17);
INSERT INTO "public"."t_menus" VALUES (22, '2023-12-06 22:55:02', 1, '2023-12-15 00:17:17', 1, 0, 'cache', ' /monitor/cache/index', 'f', 't', 0, 5, '', '缓存监控', 'redis', 't', 17);
INSERT INTO "public"."t_menus" VALUES (23, '2023-12-06 22:56:00', 1, '2023-12-15 00:17:23', 1, 0, 'cacheList', '/monitor/cache/list', 'f', 'f', 0, 5, 'cacheList', '缓存列表', 'redis-list', 't', 17);
INSERT INTO "public"."t_menus" VALUES (24, '2023-12-06 23:22:16', 1, '2023-12-06 23:22:16', 0, 0, 'icons', '/components/icons/index', 'f', 'f', 0, 3, 'Icons', '图标组件', 'icon', 't', 15);
INSERT INTO "public"."t_menus" VALUES (25, '2023-12-06 23:33:18', 1, '2023-12-06 23:37:20', 1, 0, 'build', '/tool/build/index', 'f', 'f', 0, 1, 'Build', '表单构建', 'build', 't', 15);
INSERT INTO "public"."t_menus" VALUES (26, '2023-12-07 22:06:50', 1, '2023-12-07 22:16:07', 1, 0, 'developer/:id(\d+)', '/hiker/developer/index', 'f', 't', 0, 1, 'DeveloperDetail', '开发者详情', 'peoples', 't', 10);
INSERT INTO "public"."t_menus" VALUES (27, '2023-12-07 22:09:16', 1, '2023-12-07 22:16:02', 1, 0, 'rule_type/:id(\d+)', '/hiker/rule_type/index', 'f', 't', 0, 2, 'RuleTypeDetail', '规则类型详情', 'component', 't', 10);
INSERT INTO "public"."t_menus" VALUES (28, '2023-12-07 22:56:42', 1, '2023-12-15 00:16:45', 1, 0, 'logininfor', '/monitor/logininfor/index', 'f', 'f', 0, 3, 'LoginInfor', '登录日志', 'people', 't', 17);
INSERT INTO "public"."t_menus" VALUES (29, '2023-12-11 20:39:10', 1, '2023-12-11 20:42:25', 1, 1, 'control_panel1', '/hello', 'f', 'f', 0, 1, '', 'hello world', 'clipboard', 't', 7);
INSERT INTO "public"."t_menus" VALUES (30, '2023-12-13 22:44:56', 1, '2023-12-15 00:16:50', 1, 0, 'pip', '/monitor/pip/index', 'f', 'f', 0, 4, 'Pip', '依赖管理', 'list', 't', 17);
INSERT INTO "public"."t_menus" VALUES (31, '2023-12-15 00:11:11', 1, '2023-12-15 00:17:03', 1, 0, 'job-log/:id(\d+)', '/monitor/job/log', 'f', 't', 0, 2, 'JobLog', '定时任务执行日志', 'log', 't', 17);
INSERT INTO "public"."t_menus" VALUES (32, '2023-12-15 00:36:18', 1, '2023-12-15 00:36:18', 0, 0, 'xfgpt', '/tool/xfgpt/index', 'f', 'f', 0, 4, 'XfGpt', '讯飞GPT', 'example', 't', 15);

-- ----------------------------
-- Table structure for t_perm_label
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_perm_label";
CREATE TABLE "public"."t_perm_label" (
  "id" int4 NOT NULL DEFAULT nextval('t_perm_label_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "label" varchar(128) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "remark" varchar(256) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "status" int4 DEFAULT 0
)
;
COMMENT ON COLUMN "public"."t_perm_label"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_perm_label"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_perm_label"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_perm_label"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_perm_label"."is_deleted" IS '逻辑删除:0=未删除,1=删除';
COMMENT ON COLUMN "public"."t_perm_label"."label" IS '标签';
COMMENT ON COLUMN "public"."t_perm_label"."remark" IS '备注';
COMMENT ON COLUMN "public"."t_perm_label"."status" IS '状态';

-- ----------------------------
-- Records of t_perm_label
-- ----------------------------
INSERT INTO "public"."t_perm_label" VALUES (1, '2023-12-02 15:30:37', 0, '2023-12-16 11:42:53', 1, 0, 'perm:user:get', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (2, '2023-12-02 15:30:57', 0, '2023-12-16 11:43:03', 1, 0, 'system:dict:get', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (3, '2023-12-02 15:31:25', 0, '2023-12-16 11:43:17', 1, 0, 'system:config-setting:get', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (4, '2023-12-02 15:33:26', 0, '2023-12-02 15:33:26', 0, 0, 'perm:user:put', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (5, '2023-12-02 15:36:42', 0, '2023-12-02 15:36:42', 0, 0, 'perm:user:post', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (6, '2023-12-02 15:37:45', 0, '2023-12-16 12:50:23', 1, 0, 'perm:menu:get', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (7, '2023-12-02 15:38:12', 0, '2023-12-16 12:50:26', 1, 0, 'perm:role:get', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (8, '2023-12-02 15:38:46', 0, '2023-12-16 12:50:30', 1, 0, 'perm:label:get', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (9, '2023-12-02 15:39:04', 0, '2023-12-02 15:39:04', 0, 0, 'system:config-setting:put', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (10, '2023-12-02 15:39:26', 0, '2023-12-16 11:48:34', 1, 0, 'system:dict:put', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (11, '2023-12-02 18:00:37', 0, '2023-12-02 18:00:37', 0, 0, 'hiker:developer:post', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (12, '2023-12-02 18:05:43', 0, '2023-12-02 18:05:43', 0, 0, 'perm:menu:post', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (13, '2023-12-02 18:08:24', 0, '2023-12-02 18:08:24', 0, 0, 'perm:menu:gut', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (14, '2023-12-02 18:09:28', 0, '2023-12-02 18:09:28', 0, 0, 'perm:menu:put', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (15, '2023-12-02 19:15:42', 0, '2023-12-02 19:15:42', 0, 0, 'hiker:developer:put', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (16, '2023-12-02 19:19:35', 0, '2023-12-16 12:46:21', 1, 0, 'hiker:developer:get', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (17, '2023-12-04 19:53:00', 0, '2023-12-16 11:48:20', 1, 0, 'system:dict:post', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (18, '2023-12-04 19:53:04', 0, '2023-12-16 11:43:50', 1, 0, 'system:dict:detail:get', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (19, '2023-12-04 19:53:35', 0, '2023-12-16 12:23:47', 1, 0, 'system:dict:detail:post', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (20, '2023-12-04 19:54:59', 0, '2023-12-16 12:23:50', 1, 0, 'system:dict:detail:put', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (21, '2023-12-04 19:55:50', 0, '2023-12-04 19:55:50', 0, 0, 'hiker:rule_type:post', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (22, '2023-12-04 20:00:34', 0, '2023-12-04 20:00:34', 0, 0, 'hiker:rule:post', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (23, '2023-12-04 20:00:59', 0, '2023-12-04 20:00:59', 0, 0, 'hiker:rule:put', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (24, '2023-12-04 22:13:09', 0, '2023-12-04 22:13:09', 0, 0, 'system:config-setting:post', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (25, '2023-12-05 19:44:23', 0, '2023-12-05 19:44:23', 0, 0, 'monitor:server:post', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (26, '2023-12-05 20:08:50', 0, '2023-12-16 11:59:31', 1, 0, 'monitor:server:get', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (27, '2023-12-05 22:52:40', 0, '2023-12-05 22:52:40', 0, 0, 'hiker:rule_type:put', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (28, '2023-12-05 22:52:46', 0, '2023-12-05 22:52:46', 0, 0, 'hiker:rule_type:delete', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (29, '2023-12-07 00:00:33', 0, '2023-12-07 00:00:33', 0, 0, 'perm:user:delete', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (30, '2023-12-07 19:50:07', 0, '2023-12-07 19:50:07', 0, 0, 'report:excel_generate:get', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (31, '2023-12-07 21:39:27', 0, '2023-12-07 21:39:27', 0, 0, 'report:excel_generate:post', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (32, '2023-12-09 02:27:25', 0, '2023-12-09 02:27:25', 0, 0, 'system:config_setting:delete', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (33, '2023-12-09 16:20:03', 0, '2023-12-09 16:20:03', 0, 0, 'monitor:logininfor:delete', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (34, '2023-12-09 16:50:10', 0, '2023-12-09 16:50:10', 0, 0, 'hiker:developer:delete', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (35, '2023-12-09 16:54:11', 0, '2023-12-09 16:54:11', 0, 0, 'hiker:rule:delete', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (36, '2023-12-10 17:41:10', 0, '2023-12-10 17:41:10', 0, 0, 'monitor:job:post', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (37, '2023-12-10 18:16:32', 0, '2023-12-10 18:16:32', 0, 0, 'monitor:job:put', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (38, '2023-12-10 18:25:10', 0, '2023-12-10 18:25:10', 0, 0, 'monitor:job:delete', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (39, '2023-12-11 20:42:25', 0, '2023-12-11 20:42:25', 0, 0, 'perm:menu:delete', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (40, '2023-12-13 22:29:05', 0, '2023-12-16 11:59:41', 1, 0, 'monitor:pip:get', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (41, '2023-12-13 23:12:13', 0, '2023-12-13 23:12:13', 0, 0, 'monitor:pip:put', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (42, '2023-12-13 23:21:20', 0, '2023-12-13 23:21:20', 0, 0, 'monitor:pip:delete', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (43, '2023-12-13 23:28:11', 0, '2023-12-13 23:28:11', 0, 0, 'monitor:pip:post', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (44, '2023-12-16 11:36:07', 0, '2023-12-16 11:36:07', 0, 0, 'perm:role:put', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (45, '2023-12-16 11:38:40', 0, '2023-12-16 11:38:40', 0, 0, 'perm:label:put', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (46, '2023-12-16 12:28:44', 0, '2023-12-16 12:28:44', 0, 0, 'report:excel_generate:export', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (47, '2023-12-17 14:13:25', 0, '2023-12-17 14:45:14', 1, 1, 'report:excel_generate:exports', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (48, '2023-12-17 14:38:50', 0, '2023-12-17 14:44:57', 1, 1, 'system_user:export', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (49, '2023-12-17 14:44:45', 0, '2023-12-17 14:44:45', 0, 0, 'perm:user:export', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (50, '2023-12-17 14:44:57', 0, '2023-12-17 14:44:57', 0, 0, 'perm:label:delete', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (51, '2023-12-17 14:47:51', 0, '2023-12-17 14:53:44', 1, 0, 'monitor:logininfor:export', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (52, '2023-12-17 14:47:58', 0, '2023-12-17 14:52:03', 1, 0, 'monitor:job:export', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (53, '2023-12-17 16:00:22', 0, '2023-12-17 16:00:22', 0, 0, 'monitor:cache:get', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (54, '2023-12-17 16:47:58', 0, '2023-12-17 16:47:58', 0, 0, 'monitor:cache:delete', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (55, '2024-01-02 20:24:36', 0, '2024-01-02 20:24:36', 0, 0, 'system:user:export', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (56, '2024-01-06 12:37:09', 0, '2024-01-06 12:37:09', 0, 0, 'monitor:job-log:delete', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (57, '2024-01-06 13:24:14', 0, '2024-01-06 13:24:14', 0, 0, '/monitor/jobLog/export:export', NULL, 0);
INSERT INTO "public"."t_perm_label" VALUES (58, '2024-01-06 13:36:05', 0, '2024-01-06 13:36:05', 0, 0, 'monitor:job:log:export', NULL, 0);

-- ----------------------------
-- Table structure for t_perm_label_role
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_perm_label_role";
CREATE TABLE "public"."t_perm_label_role" (
  "id" int4 NOT NULL DEFAULT nextval('t_perm_label_role_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "label_id" int4,
  "role_id" int4
)
;
COMMENT ON COLUMN "public"."t_perm_label_role"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_perm_label_role"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_perm_label_role"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_perm_label_role"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_perm_label_role"."is_deleted" IS '逻辑删除:0=未删除,1=删除';

-- ----------------------------
-- Records of t_perm_label_role
-- ----------------------------
INSERT INTO "public"."t_perm_label_role" VALUES (1, '2023-12-06 22:37:39', 0, '2023-12-06 22:37:39', 0, 0, NULL, NULL);
INSERT INTO "public"."t_perm_label_role" VALUES (2, '2023-12-16 11:42:53', 1, '2023-12-16 11:42:53', 0, 0, 1, 2);
INSERT INTO "public"."t_perm_label_role" VALUES (3, '2023-12-16 11:43:03', 1, '2023-12-16 11:43:03', 0, 0, 2, 2);
INSERT INTO "public"."t_perm_label_role" VALUES (4, '2023-12-16 11:43:17', 1, '2023-12-16 11:43:17', 0, 0, 3, 2);
INSERT INTO "public"."t_perm_label_role" VALUES (5, '2023-12-16 11:43:50', 1, '2023-12-16 11:43:50', 0, 0, 18, 2);
INSERT INTO "public"."t_perm_label_role" VALUES (17, '2023-12-16 12:50:26', 1, '2023-12-16 12:50:26', 0, 0, 7, 2);
INSERT INTO "public"."t_perm_label_role" VALUES (18, '2023-12-16 12:50:30', 1, '2023-12-16 12:50:30', 0, 0, 8, 2);
INSERT INTO "public"."t_perm_label_role" VALUES (10, '2023-12-16 11:59:31', 1, '2023-12-16 11:59:31', 0, 0, 26, 2);
INSERT INTO "public"."t_perm_label_role" VALUES (11, '2023-12-16 11:59:41', 1, '2023-12-16 11:59:41', 0, 0, 40, 2);
INSERT INTO "public"."t_perm_label_role" VALUES (16, '2023-12-16 12:50:23', 1, '2023-12-16 12:50:23', 0, 0, 6, 2);
INSERT INTO "public"."t_perm_label_role" VALUES (15, '2023-12-16 12:46:21', 1, '2023-12-16 12:46:21', 0, 0, 16, 2);
INSERT INTO "public"."t_perm_label_role" VALUES (19, '2023-12-17 14:52:03', 1, '2023-12-17 14:52:03', 0, 0, 52, 2);
INSERT INTO "public"."t_perm_label_role" VALUES (20, '2023-12-17 14:53:44', 1, '2023-12-17 14:53:44', 0, 0, 51, 2);

-- ----------------------------
-- Table structure for t_role_menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_role_menu";
CREATE TABLE "public"."t_role_menu" (
  "id" int4 NOT NULL DEFAULT nextval('t_role_menu_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "role_id" int4,
  "menu_id" int4
)
;
COMMENT ON COLUMN "public"."t_role_menu"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_role_menu"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_role_menu"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_role_menu"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_role_menu"."is_deleted" IS '逻辑删除:0=未删除,1=删除';

-- ----------------------------
-- Records of t_role_menu
-- ----------------------------
INSERT INTO "public"."t_role_menu" VALUES (1, '2022-11-22 00:55:04', 0, '2022-11-22 00:55:04', 0, 0, 3, 2);
INSERT INTO "public"."t_role_menu" VALUES (2, '2022-11-22 00:55:04', 0, '2022-11-22 00:55:04', 0, 0, 3, 4);
INSERT INTO "public"."t_role_menu" VALUES (3, '2022-11-22 00:55:04', 0, '2022-11-22 00:55:04', 0, 0, 3, 5);
INSERT INTO "public"."t_role_menu" VALUES (4, '2022-11-22 00:55:04', 0, '2022-11-22 00:55:04', 0, 0, 3, 8);
INSERT INTO "public"."t_role_menu" VALUES (114, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 32);
INSERT INTO "public"."t_role_menu" VALUES (113, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 24);
INSERT INTO "public"."t_role_menu" VALUES (112, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 20);
INSERT INTO "public"."t_role_menu" VALUES (111, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 25);
INSERT INTO "public"."t_role_menu" VALUES (110, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 16);
INSERT INTO "public"."t_role_menu" VALUES (109, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 15);
INSERT INTO "public"."t_role_menu" VALUES (108, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 30);
INSERT INTO "public"."t_role_menu" VALUES (107, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 28);
INSERT INTO "public"."t_role_menu" VALUES (106, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 18);
INSERT INTO "public"."t_role_menu" VALUES (105, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 19);
INSERT INTO "public"."t_role_menu" VALUES (104, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 17);
INSERT INTO "public"."t_role_menu" VALUES (103, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 13);
INSERT INTO "public"."t_role_menu" VALUES (102, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 27);
INSERT INTO "public"."t_role_menu" VALUES (101, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 12);
INSERT INTO "public"."t_role_menu" VALUES (100, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 11);
INSERT INTO "public"."t_role_menu" VALUES (99, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 26);
INSERT INTO "public"."t_role_menu" VALUES (98, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 10);
INSERT INTO "public"."t_role_menu" VALUES (97, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 14);
INSERT INTO "public"."t_role_menu" VALUES (96, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 4);
INSERT INTO "public"."t_role_menu" VALUES (95, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 5);
INSERT INTO "public"."t_role_menu" VALUES (94, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 8);
INSERT INTO "public"."t_role_menu" VALUES (93, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 2);

-- ----------------------------
-- Table structure for t_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_roles";
CREATE TABLE "public"."t_roles" (
  "id" int4 NOT NULL DEFAULT nextval('t_roles_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "key" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(256) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "order_num" int4 DEFAULT 0,
  "status" int4 DEFAULT 0
)
;
COMMENT ON COLUMN "public"."t_roles"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_roles"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_roles"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_roles"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_roles"."is_deleted" IS '逻辑删除:0=未删除,1=删除';
COMMENT ON COLUMN "public"."t_roles"."key" IS '权限标识';
COMMENT ON COLUMN "public"."t_roles"."name" IS '权限名称';
COMMENT ON COLUMN "public"."t_roles"."order_num" IS '顺序';
COMMENT ON COLUMN "public"."t_roles"."status" IS '状态(0: 正常, 1: 停用)';

-- ----------------------------
-- Records of t_roles
-- ----------------------------
INSERT INTO "public"."t_roles" VALUES (1, '2022-11-13 02:44:13', 0, '2022-11-13 02:44:13', 0, 0, 'admin', '超级管理员', 1, 0);
INSERT INTO "public"."t_roles" VALUES (2, '2022-11-13 02:46:33', 0, '2023-12-16 13:21:28', 1, 0, 'general', '一般用户', 2, 0);
INSERT INTO "public"."t_roles" VALUES (3, '2022-11-22 00:55:04', 1, '2022-11-22 00:55:04', 0, 0, 'Operation', '管理员', 3, 0);

-- ----------------------------
-- Table structure for t_user_role
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_user_role";
CREATE TABLE "public"."t_user_role" (
  "id" int4 NOT NULL DEFAULT nextval('t_user_role_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "user_id" int4,
  "role_id" int4
)
;
COMMENT ON COLUMN "public"."t_user_role"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_user_role"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_user_role"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_user_role"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_user_role"."is_deleted" IS '逻辑删除:0=未删除,1=删除';

-- ----------------------------
-- Records of t_user_role
-- ----------------------------
INSERT INTO "public"."t_user_role" VALUES (1, '2022-11-13 02:58:19', 0, '2022-11-13 02:58:19', 0, 0, 1, 1);
INSERT INTO "public"."t_user_role" VALUES (3, '2022-11-22 00:50:26', 0, '2022-11-22 00:50:26', 0, 0, 3, 2);
INSERT INTO "public"."t_user_role" VALUES (4, '2022-11-22 00:55:57', 1, '2022-11-22 00:55:57', 0, 0, 2, 3);
INSERT INTO "public"."t_user_role" VALUES (10, '2023-12-16 11:35:26', 1, '2023-12-16 11:35:26', 0, 0, 4, 2);
INSERT INTO "public"."t_user_role" VALUES (6, '2023-12-06 13:18:51', 0, '2023-12-06 13:18:51', 0, 0, 5, 2);
INSERT INTO "public"."t_user_role" VALUES (28, '2024-01-02 22:29:54', 0, '2024-01-02 22:29:54', 0, 0, 6, 2);

-- ----------------------------
-- Table structure for t_users
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_users";
CREATE TABLE "public"."t_users" (
  "id" int4 NOT NULL DEFAULT nextval('t_users_id_seq'::regclass),
  "created_time" timestamp(6) DEFAULT now(),
  "creator_id" int4 DEFAULT 0,
  "modified_time" timestamp(6) DEFAULT now(),
  "modifier_id" int4 DEFAULT 0,
  "is_deleted" int4 DEFAULT 0,
  "username" varchar(32) COLLATE "pg_catalog"."default" NOT NULL,
  "nickname" varchar(32) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "sex" int4 DEFAULT 0,
  "phone" varchar(32) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(256) COLLATE "pg_catalog"."default" NOT NULL,
  "hashed_password" varchar(128) COLLATE "pg_catalog"."default" NOT NULL,
  "avatar" varchar(128) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "status" int4 NOT NULL DEFAULT 0,
  "is_active" bool DEFAULT false,
  "is_superuser" bool DEFAULT false
)
;
COMMENT ON COLUMN "public"."t_users"."created_time" IS '创建时间';
COMMENT ON COLUMN "public"."t_users"."creator_id" IS '创建人id';
COMMENT ON COLUMN "public"."t_users"."modified_time" IS '更新时间';
COMMENT ON COLUMN "public"."t_users"."modifier_id" IS '修改人id';
COMMENT ON COLUMN "public"."t_users"."is_deleted" IS '逻辑删除:0=未删除,1=删除';
COMMENT ON COLUMN "public"."t_users"."username" IS '用户名';
COMMENT ON COLUMN "public"."t_users"."nickname" IS '姓名';
COMMENT ON COLUMN "public"."t_users"."sex" IS '性别';
COMMENT ON COLUMN "public"."t_users"."phone" IS '手机号';
COMMENT ON COLUMN "public"."t_users"."email" IS '邮箱';
COMMENT ON COLUMN "public"."t_users"."hashed_password" IS '密码';
COMMENT ON COLUMN "public"."t_users"."avatar" IS '头像';
COMMENT ON COLUMN "public"."t_users"."status" IS '状态';
COMMENT ON COLUMN "public"."t_users"."is_active" IS '是否已经验证用户';
COMMENT ON COLUMN "public"."t_users"."is_superuser" IS '是否超级管理员';

-- ----------------------------
-- Records of t_users
-- ----------------------------
INSERT INTO "public"."t_users" VALUES (1, '2022-11-13 02:58:19', 0, '2023-12-07 22:14:30', 1, 0, 'admin', '超级管理员', 0, '12345678910', 'admin@beginner2020.top', '$2b$12$nlyWZAzu4C9cgbHV/FE1X.nwBKiGemATgCxikPQEQVznMqBCrDw/e', 'images/avatar/5ce5f4fa-ff60-47c0-9414-d332b12b99b3.', 0, 't', 't');
INSERT INTO "public"."t_users" VALUES (2, '2022-11-22 00:48:34', 0, '2022-11-22 00:55:57', 1, 0, 'opt', 'opt', 0, '12345678911', 'opt@beginner2020.top', '$2b$12$EbJD0X5U0LwAvf5EVvYxZO20Jyv2xLKU1quekOyX3SwhdVepz1RFu', NULL, 0, 't', 'f');
INSERT INTO "public"."t_users" VALUES (3, '2022-11-22 00:50:26', 0, '2023-12-09 16:47:45', 1, 0, 'user', NULL, 0, '12345678912', 'user@beginner2020.top', '$2b$12$Wov4niPCoLOeBcRNgGDNhekSZBgB/GAhYs25CLHfJG.me1KbFP0am', NULL, 0, 't', 'f');
INSERT INTO "public"."t_users" VALUES (4, '2023-12-02 15:36:42', 1, '2023-12-16 13:16:49', 4, 0, 'hjdhnx', '道长', 2, '13154671296', '434857005@qq.com', '$2b$12$X3LQ2VXThey.YB/WGlwYq.35CKOeKkBgmA6TTR91q/VYe6hGDAWRO', 'images/avatar/f84e9577-9047-470e-bcde-16173ca1811c.jpg', 0, 't', 'f');
INSERT INTO "public"."t_users" VALUES (5, '2024-01-02 21:35:02', 0, '2024-01-02 21:38:43', 0, 0, 'admin1', '超级管理员1', 0, '12345678910', 'admin1@beginner2020.top', '$2b$12$s1WlihU/PaMhW0T2H360Me8IswCyKtep8p.kQcV3z9QVdS7natYL.', NULL, 0, 't', 'f');
INSERT INTO "public"."t_users" VALUES (6, '2024-01-02 21:41:41', 0, '2024-01-02 22:29:54', 0, 0, 'admin2', '超级管理员2', 0, '12345678910', 'admin2@beginner2020.top', '$2b$12$1JuTbUoZ4KkgNzCG1h6/9OzOLQ2NOU9g.fdPy5OHtrhFUBvBa31bO', NULL, 0, 't', 'f');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_config_settings_id_seq"
OWNED BY "public"."t_config_settings"."id";
SELECT setval('"public"."t_config_settings_id_seq"', 8, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_dict_data_id_seq"
OWNED BY "public"."t_dict_data"."id";
SELECT setval('"public"."t_dict_data_id_seq"', 9, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_dict_details_id_seq"
OWNED BY "public"."t_dict_details"."id";
SELECT setval('"public"."t_dict_details_id_seq"', 21, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_hiker_developer_id_seq"
OWNED BY "public"."t_hiker_developer"."id";
SELECT setval('"public"."t_hiker_developer_id_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_hiker_rule_id_seq"
OWNED BY "public"."t_hiker_rule"."id";
SELECT setval('"public"."t_hiker_rule_id_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_hiker_rule_type_id_seq"
OWNED BY "public"."t_hiker_rule_type"."id";
SELECT setval('"public"."t_hiker_rule_type_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_job_id_seq"
OWNED BY "public"."t_job"."id";
SELECT setval('"public"."t_job_id_seq"', 17, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_job_log_id_seq"
OWNED BY "public"."t_job_log"."id";
SELECT setval('"public"."t_job_log_id_seq"', 38, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_login_infor_id_seq"
OWNED BY "public"."t_login_infor"."id";
SELECT setval('"public"."t_login_infor_id_seq"', 122, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_menus_id_seq"
OWNED BY "public"."t_menus"."id";
SELECT setval('"public"."t_menus_id_seq"', 34, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_perm_label_id_seq"
OWNED BY "public"."t_perm_label"."id";
SELECT setval('"public"."t_perm_label_id_seq"', 60, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_perm_label_role_id_seq"
OWNED BY "public"."t_perm_label_role"."id";
SELECT setval('"public"."t_perm_label_role_id_seq"', 22, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_role_menu_id_seq"
OWNED BY "public"."t_role_menu"."id";
SELECT setval('"public"."t_role_menu_id_seq"', 116, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_roles_id_seq"
OWNED BY "public"."t_roles"."id";
SELECT setval('"public"."t_roles_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_user_role_id_seq"
OWNED BY "public"."t_user_role"."id";
SELECT setval('"public"."t_user_role_id_seq"', 30, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."t_users_id_seq"
OWNED BY "public"."t_users"."id";
SELECT setval('"public"."t_users_id_seq"', 8, true);

-- ----------------------------
-- Indexes structure for table t_config_settings
-- ----------------------------
CREATE INDEX "ix_t_config_settings_id" ON "public"."t_config_settings" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "ix_t_config_settings_name" ON "public"."t_config_settings" USING btree (
  "name" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_config_settings
-- ----------------------------
ALTER TABLE "public"."t_config_settings" ADD CONSTRAINT "t_config_settings_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_dict_data
-- ----------------------------
CREATE UNIQUE INDEX "ix_t_dict_data_dict_type" ON "public"."t_dict_data" USING btree (
  "dict_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "ix_t_dict_data_id" ON "public"."t_dict_data" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_dict_data
-- ----------------------------
ALTER TABLE "public"."t_dict_data" ADD CONSTRAINT "t_dict_data_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_dict_details
-- ----------------------------
CREATE INDEX "ix_t_dict_details_id" ON "public"."t_dict_details" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_dict_details
-- ----------------------------
ALTER TABLE "public"."t_dict_details" ADD CONSTRAINT "t_dict_details_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_hiker_developer
-- ----------------------------
CREATE INDEX "ix_t_hiker_developer_id" ON "public"."t_hiker_developer" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_hiker_developer
-- ----------------------------
ALTER TABLE "public"."t_hiker_developer" ADD CONSTRAINT "t_hiker_developer_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_hiker_rule
-- ----------------------------
CREATE INDEX "ix_t_hiker_rule_id" ON "public"."t_hiker_rule" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_hiker_rule
-- ----------------------------
ALTER TABLE "public"."t_hiker_rule" ADD CONSTRAINT "t_hiker_rule_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_hiker_rule_type
-- ----------------------------
CREATE INDEX "ix_t_hiker_rule_type_id" ON "public"."t_hiker_rule_type" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_hiker_rule_type
-- ----------------------------
ALTER TABLE "public"."t_hiker_rule_type" ADD CONSTRAINT "t_hiker_rule_type_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_job
-- ----------------------------
CREATE INDEX "ix_t_job_id" ON "public"."t_job" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_job
-- ----------------------------
ALTER TABLE "public"."t_job" ADD CONSTRAINT "t_job_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_job_log
-- ----------------------------
CREATE INDEX "ix_t_job_log_id" ON "public"."t_job_log" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_job_log
-- ----------------------------
ALTER TABLE "public"."t_job_log" ADD CONSTRAINT "t_job_log_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_login_infor
-- ----------------------------
CREATE INDEX "ix_t_login_infor_id" ON "public"."t_login_infor" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_login_infor
-- ----------------------------
ALTER TABLE "public"."t_login_infor" ADD CONSTRAINT "t_login_infor_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_menus
-- ----------------------------
CREATE INDEX "ix_t_menus_id" ON "public"."t_menus" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_menus
-- ----------------------------
ALTER TABLE "public"."t_menus" ADD CONSTRAINT "t_menus_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_perm_label
-- ----------------------------
CREATE INDEX "ix_t_perm_label_id" ON "public"."t_perm_label" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_perm_label
-- ----------------------------
ALTER TABLE "public"."t_perm_label" ADD CONSTRAINT "t_perm_label_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_perm_label_role
-- ----------------------------
CREATE INDEX "ix_t_perm_label_role_id" ON "public"."t_perm_label_role" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_perm_label_role
-- ----------------------------
ALTER TABLE "public"."t_perm_label_role" ADD CONSTRAINT "t_perm_label_role_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_role_menu
-- ----------------------------
CREATE INDEX "ix_t_role_menu_id" ON "public"."t_role_menu" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_role_menu
-- ----------------------------
ALTER TABLE "public"."t_role_menu" ADD CONSTRAINT "t_role_menu_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_roles
-- ----------------------------
CREATE INDEX "ix_t_roles_id" ON "public"."t_roles" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "ix_t_roles_key" ON "public"."t_roles" USING btree (
  "key" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_roles
-- ----------------------------
ALTER TABLE "public"."t_roles" ADD CONSTRAINT "t_roles_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_user_role
-- ----------------------------
CREATE INDEX "ix_t_user_role_id" ON "public"."t_user_role" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_user_role
-- ----------------------------
ALTER TABLE "public"."t_user_role" ADD CONSTRAINT "t_user_role_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table t_users
-- ----------------------------
CREATE INDEX "ix_t_users_id" ON "public"."t_users" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "ix_t_users_username" ON "public"."t_users" USING btree (
  "username" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table t_users
-- ----------------------------
ALTER TABLE "public"."t_users" ADD CONSTRAINT "t_users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table t_dict_details
-- ----------------------------
ALTER TABLE "public"."t_dict_details" ADD CONSTRAINT "t_dict_details_dict_data_id_fkey" FOREIGN KEY ("dict_data_id") REFERENCES "public"."t_dict_data" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table t_hiker_rule
-- ----------------------------
ALTER TABLE "public"."t_hiker_rule" ADD CONSTRAINT "t_hiker_rule_dev_id_fkey" FOREIGN KEY ("dev_id") REFERENCES "public"."t_hiker_developer" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "public"."t_hiker_rule" ADD CONSTRAINT "t_hiker_rule_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "public"."t_hiker_rule_type" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table t_perm_label_role
-- ----------------------------
ALTER TABLE "public"."t_perm_label_role" ADD CONSTRAINT "t_perm_label_role_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "public"."t_perm_label" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."t_perm_label_role" ADD CONSTRAINT "t_perm_label_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."t_roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table t_role_menu
-- ----------------------------
ALTER TABLE "public"."t_role_menu" ADD CONSTRAINT "t_role_menu_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "public"."t_menus" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."t_role_menu" ADD CONSTRAINT "t_role_menu_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."t_roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table t_user_role
-- ----------------------------
ALTER TABLE "public"."t_user_role" ADD CONSTRAINT "t_user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."t_roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."t_user_role" ADD CONSTRAINT "t_user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."t_users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
