/*
 Navicat Premium Data Transfer

 Source Server         : 本地mysql
 Source Server Type    : MySQL
 Source Server Version : 100318
 Source Host           : localhost:3306
 Source Schema         : hipy

 Target Server Type    : MySQL
 Target Server Version : 100318
 File Encoding         : 65001

 Date: 06/01/2024 14:20:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_config_settings
-- ----------------------------
DROP TABLE IF EXISTS `t_config_settings`;
CREATE TABLE `t_config_settings`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '参数名称',
  `key` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '参数键名',
  `value` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '参数键值',
  `remark` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '备注',
  `status` int(11) NULL DEFAULT 0 COMMENT '状态 0: 正常  1:停用',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ix_t_config_settings_name`(`name`) USING BTREE,
  INDEX `ix_t_config_settings_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_config_settings
-- ----------------------------
INSERT INTO `t_config_settings` VALUES (1, '2022-11-13 02:47:53', 0, '2022-11-13 02:47:53', 0, 0, '用户初始角色', 'user_init_roles', 'general', '0', 0, 1);
INSERT INTO `t_config_settings` VALUES (2, '2023-12-04 22:13:09', 1, '2023-12-09 12:29:32', 1, 0, '数据库升级密码', 'database_update_auth', 'hjdhnx', '默认密码hjdhnx', 0, 2);
INSERT INTO `t_config_settings` VALUES (3, '2023-12-04 23:04:31', 1, '2023-12-11 22:28:56', 1, 0, '登录需要验证码', 'login_with_captcha', 'no', 'yes 开启 no 关闭', 0, 3);
INSERT INTO `t_config_settings` VALUES (4, '2023-12-09 12:53:44', 0, '2024-01-02 22:14:43', 1, 0, '登录日志记录验证码错误', 'log_captcha_error', '0', '0/false不记录 1/true记录', 0, 4);
INSERT INTO `t_config_settings` VALUES (5, '2023-12-10 16:19:44', 1, '2023-12-10 16:20:17', 1, 1, '定时任务启动状态', 'sys_job_status', '0', '0 暂停 1 运行', 0, 12);
INSERT INTO `t_config_settings` VALUES (6, '2024-01-02 22:10:13', 1, '2024-01-02 22:14:30', 1, 0, '用户初始密码', 'default_password', '123456', '用户表导入的时候按这个密码创建用户记录', 0, 1);

-- ----------------------------
-- Table structure for t_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `t_dict_data`;
CREATE TABLE `t_dict_data`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `dict_type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '字典类型',
  `dict_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '字典名称',
  `remark` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '备注',
  `status` int(11) NULL DEFAULT 0 COMMENT '状态 0: 正常  1:停用',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ix_t_dict_data_dict_type`(`dict_type`) USING BTREE,
  INDEX `ix_t_dict_data_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_dict_data
-- ----------------------------
INSERT INTO `t_dict_data` VALUES (1, '2022-11-13 02:49:40', 0, '2022-11-13 02:49:40', 0, 0, 'permission_user_sex', '用户性别', '(0: 未知; 1: 男; 2: 女)', 0, 1);
INSERT INTO `t_dict_data` VALUES (2, '2022-11-13 02:49:40', 0, '2022-11-13 02:49:40', 0, 0, 'com_default_status', '通用状态字典', '(0: 正常; 1: 停用)', 0, 2);
INSERT INTO `t_dict_data` VALUES (3, '2022-11-13 02:49:40', 0, '2023-12-02 15:40:02', 1, 0, 'permission_user_status', '用户状态', NULL, 0, 1);
INSERT INTO `t_dict_data` VALUES (4, '2023-12-04 19:53:00', 1, '2023-12-04 19:57:21', 1, 0, 'hiker_rule_data_type', '海阔视界规则数据类型', '[(\'home_rule_url\', \'首页云规则\'), (\'publish\', \'提交云仓库\'), (\'js_url\', \'网页插件\'),(\'html\',\'静态页面\'),(\'config\',\'主页配置\')]', 0, 3);
INSERT INTO `t_dict_data` VALUES (5, '2023-12-10 16:20:45', 1, '2023-12-10 16:20:45', 0, 0, 'sys_job_group', '定时任务分组', NULL, 0, 4);
INSERT INTO `t_dict_data` VALUES (6, '2023-12-10 16:21:01', 1, '2023-12-10 16:21:01', 0, 0, 'sys_job_status', '定时任务运行状态', NULL, 0, 5);
INSERT INTO `t_dict_data` VALUES (7, '2024-01-06 12:05:26', 1, '2024-01-06 12:05:26', 0, 0, 'sys_job_run_status', '定时任务调度状态', '1 正常 0 失败', 0, 7);

-- ----------------------------
-- Table structure for t_dict_details
-- ----------------------------
DROP TABLE IF EXISTS `t_dict_details`;
CREATE TABLE `t_dict_details`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `dict_label` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '字典标签',
  `dict_disabled` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否禁用',
  `dict_value` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '字典键值',
  `remark` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '备注',
  `is_default` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否默认值',
  `status` int(11) NULL DEFAULT 0 COMMENT '状态 0: 正常  1:停用',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序',
  `dict_data_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `dict_data_id`(`dict_data_id`) USING BTREE,
  INDEX `ix_t_dict_details_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_dict_details
-- ----------------------------
INSERT INTO `t_dict_details` VALUES (1, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '未知', 0, '0', NULL, 1, 0, 1, 1);
INSERT INTO `t_dict_details` VALUES (2, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '男', 0, '1', NULL, 0, 0, 2, 1);
INSERT INTO `t_dict_details` VALUES (3, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '女', 0, '2', NULL, 0, 0, 3, 1);
INSERT INTO `t_dict_details` VALUES (4, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '正常', 0, '0', NULL, 1, 0, 0, 2);
INSERT INTO `t_dict_details` VALUES (5, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '停用', 0, '1', NULL, 0, 0, 1, 2);
INSERT INTO `t_dict_details` VALUES (6, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '正常', 0, '0', NULL, 1, 0, 1, 3);
INSERT INTO `t_dict_details` VALUES (7, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '停用', 0, '1', NULL, 0, 0, 2, 3);
INSERT INTO `t_dict_details` VALUES (8, '2022-11-13 02:52:55', 0, '2022-11-13 02:52:55', 0, 0, '拉黑', 0, '2', NULL, 0, 0, 3, 3);
INSERT INTO `t_dict_details` VALUES (9, '2023-12-04 19:53:35', 1, '2023-12-04 19:53:35', 0, 0, '首页云规则', 0, 'home_rule_url', NULL, 1, 0, 1, 4);
INSERT INTO `t_dict_details` VALUES (10, '2023-12-04 19:53:56', 1, '2023-12-04 19:58:52', 1, 0, '提交云仓库', 1, 'publish', NULL, 0, 0, 2, 4);
INSERT INTO `t_dict_details` VALUES (11, '2023-12-04 19:54:20', 1, '2023-12-04 19:54:20', 0, 0, '网页插件', 0, 'js_url', NULL, 0, 0, 3, 4);
INSERT INTO `t_dict_details` VALUES (12, '2023-12-04 19:54:35', 1, '2023-12-04 19:54:35', 0, 0, '静态页面', 0, 'html', NULL, 0, 0, 4, 4);
INSERT INTO `t_dict_details` VALUES (13, '2023-12-04 19:54:53', 1, '2023-12-04 19:54:53', 0, 0, '主页配置', 0, 'config', NULL, 0, 0, 5, 4);
INSERT INTO `t_dict_details` VALUES (14, '2023-12-10 16:21:16', 1, '2023-12-10 16:21:29', 1, 0, '暂停', 0, '0', NULL, 1, 0, 1, 6);
INSERT INTO `t_dict_details` VALUES (15, '2023-12-10 16:21:22', 1, '2023-12-10 16:21:22', 0, 0, '启动', 0, '1', NULL, 0, 0, 2, 6);
INSERT INTO `t_dict_details` VALUES (16, '2023-12-10 16:22:10', 1, '2023-12-10 16:22:43', 1, 0, '单次', 0, 'setTimeout', NULL, 0, 0, 1, 5);
INSERT INTO `t_dict_details` VALUES (17, '2023-12-10 16:22:31', 1, '2023-12-10 16:22:58', 1, 0, '循环', 0, 'setInterval', NULL, 1, 0, 2, 5);
INSERT INTO `t_dict_details` VALUES (18, '2024-01-06 12:05:43', 1, '2024-01-06 12:05:43', 0, 0, '失败', 0, '0', NULL, 0, 0, 1, 7);
INSERT INTO `t_dict_details` VALUES (19, '2024-01-06 12:05:52', 1, '2024-01-06 12:05:52', 0, 0, '正常', 0, '1', NULL, 1, 0, 2, 7);

-- ----------------------------
-- Table structure for t_hiker_developer
-- ----------------------------
DROP TABLE IF EXISTS `t_hiker_developer`;
CREATE TABLE `t_hiker_developer`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '开发者账号',
  `qq` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'QQ号',
  `password` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '123456' COMMENT '开发者密码',
  `status` int(11) NULL DEFAULT 0 COMMENT '状态',
  `is_manager` tinyint(1) NULL DEFAULT 0 COMMENT '是否超管',
  `active` tinyint(1) NULL DEFAULT 1 COMMENT '是否启用',
  `test` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '测试字段',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_t_hiker_developer_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_hiker_developer
-- ----------------------------
INSERT INTO `t_hiker_developer` VALUES (1, '2023-12-02 18:00:37', 1, '2023-12-09 16:55:06', 1, 0, '道长', '434857005', '123456789', 0, 0, 1, NULL);

-- ----------------------------
-- Table structure for t_hiker_rule
-- ----------------------------
DROP TABLE IF EXISTS `t_hiker_rule`;
CREATE TABLE `t_hiker_rule`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '规则名称',
  `type_id` int(11) NULL DEFAULT NULL COMMENT '规则类型',
  `dev_id` int(11) NULL DEFAULT NULL COMMENT '开发者',
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL COMMENT '规则Json',
  `url` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '地址',
  `state` int(11) NULL DEFAULT 0 COMMENT '状态',
  `auth` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '私有密码',
  `auth_date_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '私有密码过期时间',
  `time_over` tinyint(1) NULL DEFAULT 0 COMMENT '私有规则过期',
  `b64_value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL COMMENT '64编码',
  `home_url` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '规则主页链接',
  `pic_url` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '网站图标链接',
  `is_json` tinyint(1) NULL DEFAULT 1 COMMENT '是否json值',
  `is_redirect` tinyint(1) NULL DEFAULT 0 COMMENT '是否为后端重定向',
  `is_tap` tinyint(1) NULL DEFAULT 0 COMMENT '是否为仓库跳转规则',
  `can_discuss` tinyint(1) NULL DEFAULT 1 COMMENT '是否可以互动',
  `is_json_list` tinyint(1) NULL DEFAULT 0 COMMENT '是否json列表',
  `data_type` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT 'home_rule_url' COMMENT '数据类型',
  `version` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '0' COMMENT '版本号',
  `author` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '作者',
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL COMMENT '说明',
  `good_num` int(11) NULL DEFAULT 0 COMMENT '点赞数',
  `bad_num` int(11) NULL DEFAULT 0 COMMENT '踩数',
  `reply_num` int(11) NULL DEFAULT 0 COMMENT '回复数',
  `is_safe` tinyint(1) NULL DEFAULT 1 COMMENT '是否安全',
  `is_good` tinyint(1) NULL DEFAULT 0 COMMENT '是否优质',
  `is_white` tinyint(1) NULL DEFAULT 0 COMMENT '是否白名单',
  `not_safe_note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL COMMENT '风险描述',
  `last_active` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '开发者上次提交时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `type_id`(`type_id`) USING BTREE,
  INDEX `dev_id`(`dev_id`) USING BTREE,
  INDEX `ix_t_hiker_rule_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_hiker_rule
-- ----------------------------
INSERT INTO `t_hiker_rule` VALUES (1, '2023-12-04 20:00:34', 1, '2023-12-09 16:54:53', 1, 0, '道德经', 1, 1, '\"{\\\"name\\\":\\\"道德经\\\"}\"', 'hiker://empty#', 1, NULL, '2023-12-04 20:00:34', 0, NULL, NULL, NULL, 1, 0, 0, 1, 0, 'home_rule_url', '1', '道长', NULL, 1, 1, 1, 1, 1, 1, NULL, '2023-12-04 20:00:34');

-- ----------------------------
-- Table structure for t_hiker_rule_type
-- ----------------------------
DROP TABLE IF EXISTS `t_hiker_rule_type`;
CREATE TABLE `t_hiker_rule_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '分类名称',
  `count_num` int(11) NULL DEFAULT 0 COMMENT '数目',
  `active` tinyint(1) NULL DEFAULT 1 COMMENT '是否启用',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_t_hiker_rule_type_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_hiker_rule_type
-- ----------------------------
INSERT INTO `t_hiker_rule_type` VALUES (1, '2023-12-04 19:55:50', 1, '2023-12-09 16:55:14', 1, 0, '影视', 2, 1);
INSERT INTO `t_hiker_rule_type` VALUES (2, '2023-12-05 22:52:36', 1, '2023-12-09 16:55:12', 1, 0, '电影2', 3, 1);

-- ----------------------------
-- Table structure for t_job
-- ----------------------------
DROP TABLE IF EXISTS `t_job`;
CREATE TABLE `t_job`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `job_id` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '任务代号',
  `job_name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '任务名称',
  `job_group` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '任务组名',
  `func_name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '调用目标字符串',
  `func_args` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '传入位置参数',
  `func_kwargs` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '传入字典参数',
  `cron_model` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '执行模式',
  `coalesce` int(11) NULL DEFAULT 0 COMMENT '是否并发',
  `next_run` datetime(0) NULL DEFAULT NULL COMMENT '下次执行时间',
  `cron_expression` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'cron执行表达式',
  `status` int(11) NULL DEFAULT 0 COMMENT '任务状态',
  `misfire_policy` int(11) NULL DEFAULT 0 COMMENT '执行策略',
  `active` tinyint(1) NULL DEFAULT 1 COMMENT '是否启用',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_t_job_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_job
-- ----------------------------
INSERT INTO `t_job` VALUES (1, '2023-12-10 21:31:19', 1, '2024-01-06 13:57:43', 1, 0, 'demo', '测试', 'setInterval', 'tasks.demo_task.demo', '[\'hello world\']', '{\'a\':\'1\',\'b\':\'2\'}', 'cron', 0, '2024-01-06 13:57:53', '30 20 * * * ?', 1, 1, 1);
INSERT INTO `t_job` VALUES (14, '2023-12-13 00:26:59', 1, '2024-01-06 13:57:43', 1, 0, 'demo2', '测试2', 'setInterval', 'tasks.demo_task.demo', '[\'哈哈哈哈哈\']', '{\'key\':\'你好吗\'}', 'cron', 0, '2024-01-06 13:57:53', '30 10 * * * ?', 1, 1, 1);
INSERT INTO `t_job` VALUES (15, '2023-12-13 00:53:05', 1, '2024-01-06 13:57:43', 1, 0, 'kzz', '可转债打新查询', 'setInterval', 'tasks.kzz_spider.get_now_kzz', NULL, '{\'dayeExtra\':8}', 'cron', 0, '2024-01-06 13:57:53', '0 0 8 1/1 * ?', 1, 1, 1);

-- ----------------------------
-- Table structure for t_job_log
-- ----------------------------
DROP TABLE IF EXISTS `t_job_log`;
CREATE TABLE `t_job_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `job_id` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '任务代号',
  `job_name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '任务名称',
  `job_group` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '任务组名',
  `func_name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '调用目标字符串',
  `func_args` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '传入位置参数',
  `func_kwargs` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '传入字典参数',
  `run_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL COMMENT '正常日志信息',
  `run_except_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL COMMENT '异常日志信息',
  `run_status` int(11) NULL DEFAULT 0 COMMENT '执行状态',
  `run_time` datetime(0) NULL DEFAULT NULL COMMENT '执行时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_t_job_log_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 37 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_job_log
-- ----------------------------
INSERT INTO `t_job_log` VALUES (34, '2024-01-06 13:43:41', 0, '2024-01-06 13:43:41', 0, 0, 'demo2', '测试2', 'setInterval', 'tasks.demo_task.demo', '[\'哈哈哈哈哈\']', '{\'key\':\'你好吗\'}', '----------------task_id:demo2,args:(\'哈哈哈哈哈\',),kwargs:{\'key\': \'你好吗\'}----------------', NULL, 1, '2024-01-06 13:43:41');
INSERT INTO `t_job_log` VALUES (35, '2024-01-06 13:43:45', 0, '2024-01-06 13:43:45', 0, 0, 'demo', '测试', 'setInterval', 'tasks.demo_task.demo', '[\'hello world\']', '{\'a\':\'1\',\'b\':\'2\'}', '----------------task_id:demo,args:(\'hello world\',),kwargs:{\'a\': \'1\', \'b\': \'2\'}----------------', NULL, 1, '2024-01-06 13:43:45');
INSERT INTO `t_job_log` VALUES (36, '2024-01-06 13:43:48', 0, '2024-01-06 13:43:48', 0, 0, 'kzz', '可转债打新查询', 'setInterval', 'tasks.kzz_spider.get_now_kzz', NULL, '{\'dayeExtra\':8}', '[]', NULL, 1, '2024-01-06 13:43:48');

-- ----------------------------
-- Table structure for t_login_infor
-- ----------------------------
DROP TABLE IF EXISTS `t_login_infor`;
CREATE TABLE `t_login_infor`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `user_name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '用户名称',
  `ipaddr` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '登录地址',
  `login_location` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '登录地点',
  `browser` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '浏览器',
  `os` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '操作系统',
  `status` int(11) NULL DEFAULT 0 COMMENT '登录状态',
  `msg` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '操作信息',
  `login_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '登录日期',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_t_login_infor_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 121 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_login_infor
-- ----------------------------
INSERT INTO `t_login_infor` VALUES (88, '2023-12-13 21:58:49', 0, '2023-12-13 21:58:49', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-13 21:58:49');
INSERT INTO `t_login_infor` VALUES (87, '2023-12-13 00:51:25', 0, '2023-12-13 00:51:25', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-13 00:51:25');
INSERT INTO `t_login_infor` VALUES (86, '2023-12-13 00:21:12', 0, '2023-12-13 00:21:12', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-13 00:21:12');
INSERT INTO `t_login_infor` VALUES (85, '2023-12-12 23:50:22', 0, '2023-12-12 23:50:22', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-12 23:50:22');
INSERT INTO `t_login_infor` VALUES (84, '2023-12-12 23:50:21', 0, '2023-12-12 23:50:21', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-12 23:50:21');
INSERT INTO `t_login_infor` VALUES (83, '2023-12-12 23:19:26', 0, '2023-12-12 23:19:26', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-12 23:19:26');
INSERT INTO `t_login_infor` VALUES (82, '2023-12-12 22:49:02', 0, '2023-12-12 22:49:02', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-12 22:49:02');
INSERT INTO `t_login_infor` VALUES (81, '2023-12-11 22:58:38', 0, '2023-12-11 22:58:38', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-11 22:58:38');
INSERT INTO `t_login_infor` VALUES (80, '2023-12-11 22:27:14', 0, '2023-12-11 22:27:14', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-11 22:27:14');
INSERT INTO `t_login_infor` VALUES (79, '2023-12-11 21:51:01', 0, '2023-12-11 21:51:01', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-11 21:51:01');
INSERT INTO `t_login_infor` VALUES (73, '2023-12-10 22:40:50', 0, '2023-12-10 22:40:50', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-10 22:40:50');
INSERT INTO `t_login_infor` VALUES (74, '2023-12-10 23:11:02', 0, '2023-12-10 23:11:02', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-10 23:11:02');
INSERT INTO `t_login_infor` VALUES (75, '2023-12-11 20:16:51', 0, '2023-12-11 20:16:51', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-11 20:16:51');
INSERT INTO `t_login_infor` VALUES (76, '2023-12-11 20:34:36', 0, '2023-12-11 20:34:36', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-11 20:34:36');
INSERT INTO `t_login_infor` VALUES (77, '2023-12-11 20:36:15', 0, '2023-12-11 20:36:15', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-11 20:36:15');
INSERT INTO `t_login_infor` VALUES (78, '2023-12-11 21:15:50', 0, '2023-12-11 21:15:50', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 119.0.0', 'Windows 10', 0, '登录成功', '2023-12-11 21:15:50');
INSERT INTO `t_login_infor` VALUES (89, '2023-12-14 22:54:21', 0, '2023-12-14 22:54:21', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-14 22:54:21');
INSERT INTO `t_login_infor` VALUES (90, '2023-12-16 10:43:12', 0, '2023-12-16 10:43:12', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-16 10:43:12');
INSERT INTO `t_login_infor` VALUES (91, '2023-12-16 11:36:26', 0, '2023-12-16 11:36:26', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 1, '密码错误', '2023-12-16 11:36:26');
INSERT INTO `t_login_infor` VALUES (92, '2023-12-16 11:36:29', 0, '2023-12-16 11:36:29', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 1, '用户账号尚未激活', '2023-12-16 11:36:29');
INSERT INTO `t_login_infor` VALUES (93, '2023-12-16 11:36:47', 0, '2023-12-16 11:36:47', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-16 11:36:47');
INSERT INTO `t_login_infor` VALUES (94, '2023-12-16 12:47:42', 0, '2023-12-16 12:47:42', 0, 0, 'admin', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-16 12:47:42');
INSERT INTO `t_login_infor` VALUES (95, '2023-12-16 12:50:11', 0, '2023-12-16 12:50:11', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-16 12:50:11');
INSERT INTO `t_login_infor` VALUES (96, '2023-12-17 13:49:34', 0, '2023-12-17 13:49:34', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 13:49:34');
INSERT INTO `t_login_infor` VALUES (97, '2023-12-17 13:49:42', 0, '2023-12-17 13:49:42', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 13:49:42');
INSERT INTO `t_login_infor` VALUES (98, '2023-12-17 14:11:13', 0, '2023-12-17 14:11:13', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 14:11:13');
INSERT INTO `t_login_infor` VALUES (99, '2023-12-17 14:51:31', 0, '2023-12-17 14:51:31', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 14:51:31');
INSERT INTO `t_login_infor` VALUES (100, '2023-12-17 14:58:45', 0, '2023-12-17 14:58:45', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 14:58:45');
INSERT INTO `t_login_infor` VALUES (101, '2023-12-17 15:33:10', 0, '2023-12-17 15:33:10', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 15:33:10');
INSERT INTO `t_login_infor` VALUES (102, '2023-12-17 15:37:34', 0, '2023-12-17 15:37:34', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 15:37:34');
INSERT INTO `t_login_infor` VALUES (103, '2023-12-17 15:47:12', 0, '2023-12-17 15:47:12', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 15:47:12');
INSERT INTO `t_login_infor` VALUES (104, '2023-12-17 16:49:11', 0, '2023-12-17 16:49:11', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 16:49:11');
INSERT INTO `t_login_infor` VALUES (105, '2023-12-17 16:49:27', 0, '2023-12-17 16:49:27', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 16:49:27');
INSERT INTO `t_login_infor` VALUES (106, '2023-12-17 16:53:08', 0, '2023-12-17 16:53:08', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 16:53:08');
INSERT INTO `t_login_infor` VALUES (107, '2023-12-17 16:55:32', 0, '2023-12-17 16:55:32', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 16:55:32');
INSERT INTO `t_login_infor` VALUES (108, '2023-12-17 17:01:24', 0, '2023-12-17 17:01:24', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 17:01:24');
INSERT INTO `t_login_infor` VALUES (109, '2023-12-17 17:01:45', 0, '2023-12-17 17:01:45', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 17:01:45');
INSERT INTO `t_login_infor` VALUES (110, '2023-12-17 17:01:54', 0, '2023-12-17 17:01:54', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 17:01:54');
INSERT INTO `t_login_infor` VALUES (111, '2023-12-17 17:05:01', 0, '2023-12-17 17:05:01', 0, 0, 'hjdhnx', '127.0.0.1', NULL, 'Edge 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-17 17:05:01');
INSERT INTO `t_login_infor` VALUES (112, '2023-12-20 19:51:10', 0, '2023-12-20 19:51:10', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-20 19:51:10');
INSERT INTO `t_login_infor` VALUES (113, '2023-12-20 22:09:51', 0, '2023-12-20 22:09:51', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-20 22:09:51');
INSERT INTO `t_login_infor` VALUES (114, '2023-12-28 21:23:12', 0, '2023-12-28 21:23:12', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2023-12-28 21:23:12');
INSERT INTO `t_login_infor` VALUES (115, '2024-01-02 20:24:17', 0, '2024-01-02 20:24:17', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2024-01-02 20:24:17');
INSERT INTO `t_login_infor` VALUES (116, '2024-01-02 21:48:03', 0, '2024-01-02 21:48:03', 0, 0, 'admin2', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2024-01-02 21:48:03');
INSERT INTO `t_login_infor` VALUES (117, '2024-01-02 22:12:01', 0, '2024-01-02 22:12:01', 0, 0, 'admin1', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2024-01-02 22:12:01');
INSERT INTO `t_login_infor` VALUES (118, '2024-01-02 22:12:13', 0, '2024-01-02 22:12:13', 0, 0, 'admin2', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 1, '密码错误', '2024-01-02 22:12:13');
INSERT INTO `t_login_infor` VALUES (119, '2024-01-02 22:12:17', 0, '2024-01-02 22:12:17', 0, 0, 'admin2', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2024-01-02 22:12:17');
INSERT INTO `t_login_infor` VALUES (120, '2024-01-06 11:14:03', 0, '2024-01-06 11:14:03', 0, 0, 'admin', '127.0.0.1', NULL, 'Chrome 120.0.0', 'Windows 10', 0, '登录成功', '2024-01-06 11:14:03');

-- ----------------------------
-- Table structure for t_menus
-- ----------------------------
DROP TABLE IF EXISTS `t_menus`;
CREATE TABLE `t_menus`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `path` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '路由',
  `component` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '组件',
  `is_frame` tinyint(1) NULL DEFAULT 0 COMMENT '是否外链',
  `hidden` tinyint(1) NULL DEFAULT 0 COMMENT '是否隐藏',
  `status` int(11) NULL DEFAULT 0 COMMENT '菜单状态',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '显示排序',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '唯一标识用于页面缓存，否则keep-alive会出问题',
  `title` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '标题',
  `icon` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '图标',
  `no_cache` tinyint(1) NULL DEFAULT 0 COMMENT '是否缓存',
  `parent_id` int(11) NULL DEFAULT 0 COMMENT '上级菜单',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_t_menus_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_menus
-- ----------------------------
INSERT INTO `t_menus` VALUES (1, '2022-07-14 03:56:19', 0, '2022-07-19 15:40:51', 0, 0, 'role', '/permission/role/index', 0, 0, 0, 3, 'PermissionRole', '角色管理', 'peoples', 1, 7);
INSERT INTO `t_menus` VALUES (2, '2022-07-14 03:56:19', 0, '2022-07-20 10:25:17', 0, 0, '/system', '', 0, 0, 0, 2, '', '系统管理', 'system', 0, 0);
INSERT INTO `t_menus` VALUES (3, '2022-07-14 03:56:19', 0, '2022-07-19 16:03:40', 0, 0, 'menu', '/permission/menu/index', 0, 0, 0, 2, 'PermissionMenu', '菜单管理', 'tree-table', 0, 7);
INSERT INTO `t_menus` VALUES (4, '2022-07-14 03:56:19', 0, '2022-07-14 03:56:19', 0, 0, 'dict', '/system/dict/index', 0, 0, 0, 4, 'SystemDictType', '字典管理', 'dict', 0, 2);
INSERT INTO `t_menus` VALUES (5, '2022-07-14 03:56:19', 0, '2022-07-14 03:56:19', 0, 0, 'parameter', '/system/parameter/index', 0, 0, 0, 3, 'SystemParameter', '参数管理', 'tree', 0, 2);
INSERT INTO `t_menus` VALUES (6, '2022-07-14 03:56:19', 0, '2022-07-19 16:03:33', 0, 0, 'user', '/permission/user/index', 0, 0, 0, 1, 'PermissionUser', '用户管理', 'user', 0, 7);
INSERT INTO `t_menus` VALUES (7, '2022-07-14 03:56:19', 0, '2022-07-20 10:25:24', 0, 0, '/permission', '', 0, 0, 0, 1, '', '权限管理', 'monitor', 0, 0);
INSERT INTO `t_menus` VALUES (8, '2022-07-14 03:56:19', 0, '2022-07-14 03:56:19', 0, 0, 'dict/detail/:id(\\d+)', '/system/dict/detail/index', 0, 1, 0, 1, 'SystemDictDetail', '字典参数', 'dashboard', 0, 2);
INSERT INTO `t_menus` VALUES (9, '2022-10-29 23:57:16', 0, '2022-10-29 23:57:16', 0, 0, 'label', '/permission/label/index', 0, 0, 0, 4, 'PermissionLabel', '权限标签', 'icon', 1, 7);
INSERT INTO `t_menus` VALUES (11, '2023-12-02 18:06:51', 0, '2023-12-07 22:10:46', 1, 0, 'developer', '/hiker/developer/index', 0, 0, 0, 1, 'HikerDeveloper', '开发者', 'peoples', 1, 10);
INSERT INTO `t_menus` VALUES (10, '2023-12-02 18:05:43', 0, '2023-12-02 18:05:43', 0, 0, '/hiker', '', 0, 0, 0, 3, '', '海阔视界', 'international', 1, 0);
INSERT INTO `t_menus` VALUES (12, '2023-12-02 23:23:55', 1, '2023-12-07 22:10:55', 1, 0, 'rule_type', '/hiker/rule_type/index', 0, 0, 0, 2, 'HikerRuleType', '规则类型', 'component', 1, 10);
INSERT INTO `t_menus` VALUES (13, '2023-12-03 19:03:50', 1, '2023-12-07 22:11:07', 1, 0, 'rule', '/hiker/rule/index', 0, 0, 0, 3, 'HikerRule', '规则', 'list', 1, 10);
INSERT INTO `t_menus` VALUES (14, '2023-12-04 21:49:25', 1, '2023-12-04 21:49:25', 0, 0, 'control_panel', '/control_panel/index', 0, 0, 0, 4, 'ControlPanel', '控制面板', 'swagger', 1, 2);
INSERT INTO `t_menus` VALUES (15, '2023-12-05 08:49:37', 1, '2023-12-05 08:50:03', 1, 0, '/tool', '', 0, 0, 0, 4, '', '工具', 'bug', 1, 0);
INSERT INTO `t_menus` VALUES (16, '2023-12-05 08:51:06', 1, '2023-12-05 08:52:00', 1, 0, 'swagger', '/tool/swagger/index', 0, 0, 0, 1, 'Swagger', 'swagger', 'swagger', 1, 15);
INSERT INTO `t_menus` VALUES (17, '2023-12-05 09:08:13', 1, '2023-12-06 22:50:59', 1, 0, '/monitor', '', 0, 0, 0, 4, '', '系统监控', 'monitor', 1, 0);
INSERT INTO `t_menus` VALUES (18, '2023-12-05 09:09:57', 1, '2023-12-07 00:03:28', 1, 0, 'job', '/monitor/job/index', 0, 0, 0, 2, 'Job', '定时任务', 'time-range', 1, 17);
INSERT INTO `t_menus` VALUES (19, '2023-12-05 09:11:12', 1, '2023-12-07 00:03:23', 1, 0, 'server', '/monitor/server/index', 0, 0, 0, 1, 'Server', '服务监控', 'server', 1, 17);
INSERT INTO `t_menus` VALUES (20, '2023-12-06 22:49:09', 1, '2023-12-06 22:49:09', 0, 0, 'blog', '/tool/blog/index', 0, 0, 0, 2, 'Blog', '博客', 'log', 1, 15);
INSERT INTO `t_menus` VALUES (21, '2023-12-06 22:53:25', 1, '2023-12-15 00:17:28', 1, 0, 'online', '/monitor/online/index', 0, 1, 0, 6, 'Online', '在线用户', 'online', 1, 17);
INSERT INTO `t_menus` VALUES (22, '2023-12-06 22:55:02', 1, '2023-12-15 00:17:17', 1, 0, 'cache', ' /monitor/cache/index', 0, 1, 0, 5, '', '缓存监控', 'redis', 1, 17);
INSERT INTO `t_menus` VALUES (23, '2023-12-06 22:56:00', 1, '2023-12-15 00:17:23', 1, 0, 'cacheList', '/monitor/cache/list', 0, 0, 0, 5, 'cacheList', '缓存列表', 'redis-list', 1, 17);
INSERT INTO `t_menus` VALUES (24, '2023-12-06 23:22:16', 1, '2023-12-06 23:22:16', 0, 0, 'icons', '/components/icons/index', 0, 0, 0, 3, 'Icons', '图标组件', 'icon', 1, 15);
INSERT INTO `t_menus` VALUES (25, '2023-12-06 23:33:18', 1, '2023-12-06 23:37:20', 1, 0, 'build', '/tool/build/index', 0, 0, 0, 1, 'Build', '表单构建', 'build', 1, 15);
INSERT INTO `t_menus` VALUES (26, '2023-12-07 22:06:50', 1, '2023-12-07 22:16:07', 1, 0, 'developer/:id(\\d+)', '/hiker/developer/index', 0, 1, 0, 1, 'DeveloperDetail', '开发者详情', 'peoples', 1, 10);
INSERT INTO `t_menus` VALUES (27, '2023-12-07 22:09:16', 1, '2023-12-07 22:16:02', 1, 0, 'rule_type/:id(\\d+)', '/hiker/rule_type/index', 0, 1, 0, 2, 'RuleTypeDetail', '规则类型详情', 'component', 1, 10);
INSERT INTO `t_menus` VALUES (28, '2023-12-07 22:56:42', 1, '2023-12-15 00:16:45', 1, 0, 'logininfor', '/monitor/logininfor/index', 0, 0, 0, 3, 'LoginInfor', '登录日志', 'people', 1, 17);
INSERT INTO `t_menus` VALUES (29, '2023-12-11 20:39:10', 1, '2023-12-11 20:42:25', 1, 1, 'control_panel1', '/hello', 0, 0, 0, 1, '', 'hello world', 'clipboard', 1, 7);
INSERT INTO `t_menus` VALUES (30, '2023-12-13 22:44:56', 1, '2023-12-15 00:16:50', 1, 0, 'pip', '/monitor/pip/index', 0, 0, 0, 4, 'Pip', '依赖管理', 'list', 1, 17);
INSERT INTO `t_menus` VALUES (31, '2023-12-15 00:11:11', 1, '2023-12-15 00:17:03', 1, 0, 'job-log/:id(\\d+)', '/monitor/job/log', 0, 1, 0, 2, 'JobLog', '定时任务执行日志', 'log', 1, 17);
INSERT INTO `t_menus` VALUES (32, '2023-12-15 00:36:18', 1, '2023-12-15 00:36:18', 0, 0, 'xfgpt', '/tool/xfgpt/index', 0, 0, 0, 4, 'XfGpt', '讯飞GPT', 'example', 1, 15);

-- ----------------------------
-- Table structure for t_perm_label
-- ----------------------------
DROP TABLE IF EXISTS `t_perm_label`;
CREATE TABLE `t_perm_label`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `label` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '标签',
  `remark` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '备注',
  `status` int(11) NULL DEFAULT 0 COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_t_perm_label_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 59 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_perm_label
-- ----------------------------
INSERT INTO `t_perm_label` VALUES (1, '2023-12-02 15:30:37', 0, '2023-12-16 11:42:53', 1, 0, 'perm:user:get', NULL, 0);
INSERT INTO `t_perm_label` VALUES (2, '2023-12-02 15:30:57', 0, '2023-12-16 11:43:03', 1, 0, 'system:dict:get', NULL, 0);
INSERT INTO `t_perm_label` VALUES (3, '2023-12-02 15:31:25', 0, '2023-12-16 11:43:17', 1, 0, 'system:config-setting:get', NULL, 0);
INSERT INTO `t_perm_label` VALUES (4, '2023-12-02 15:33:26', 0, '2023-12-02 15:33:26', 0, 0, 'perm:user:put', NULL, 0);
INSERT INTO `t_perm_label` VALUES (5, '2023-12-02 15:36:42', 0, '2023-12-02 15:36:42', 0, 0, 'perm:user:post', NULL, 0);
INSERT INTO `t_perm_label` VALUES (6, '2023-12-02 15:37:45', 0, '2023-12-16 12:50:23', 1, 0, 'perm:menu:get', NULL, 0);
INSERT INTO `t_perm_label` VALUES (7, '2023-12-02 15:38:12', 0, '2023-12-16 12:50:26', 1, 0, 'perm:role:get', NULL, 0);
INSERT INTO `t_perm_label` VALUES (8, '2023-12-02 15:38:46', 0, '2023-12-16 12:50:30', 1, 0, 'perm:label:get', NULL, 0);
INSERT INTO `t_perm_label` VALUES (9, '2023-12-02 15:39:04', 0, '2023-12-02 15:39:04', 0, 0, 'system:config-setting:put', NULL, 0);
INSERT INTO `t_perm_label` VALUES (10, '2023-12-02 15:39:26', 0, '2023-12-16 11:48:34', 1, 0, 'system:dict:put', NULL, 0);
INSERT INTO `t_perm_label` VALUES (11, '2023-12-02 18:00:37', 0, '2023-12-02 18:00:37', 0, 0, 'hiker:developer:post', NULL, 0);
INSERT INTO `t_perm_label` VALUES (12, '2023-12-02 18:05:43', 0, '2023-12-02 18:05:43', 0, 0, 'perm:menu:post', NULL, 0);
INSERT INTO `t_perm_label` VALUES (13, '2023-12-02 18:08:24', 0, '2023-12-02 18:08:24', 0, 0, 'perm:menu:gut', NULL, 0);
INSERT INTO `t_perm_label` VALUES (14, '2023-12-02 18:09:28', 0, '2023-12-02 18:09:28', 0, 0, 'perm:menu:put', NULL, 0);
INSERT INTO `t_perm_label` VALUES (15, '2023-12-02 19:15:42', 0, '2023-12-02 19:15:42', 0, 0, 'hiker:developer:put', NULL, 0);
INSERT INTO `t_perm_label` VALUES (16, '2023-12-02 19:19:35', 0, '2023-12-16 12:46:21', 1, 0, 'hiker:developer:get', NULL, 0);
INSERT INTO `t_perm_label` VALUES (17, '2023-12-04 19:53:00', 0, '2023-12-16 11:48:20', 1, 0, 'system:dict:post', NULL, 0);
INSERT INTO `t_perm_label` VALUES (18, '2023-12-04 19:53:04', 0, '2023-12-16 11:43:50', 1, 0, 'system:dict:detail:get', NULL, 0);
INSERT INTO `t_perm_label` VALUES (19, '2023-12-04 19:53:35', 0, '2023-12-16 12:23:47', 1, 0, 'system:dict:detail:post', NULL, 0);
INSERT INTO `t_perm_label` VALUES (20, '2023-12-04 19:54:59', 0, '2023-12-16 12:23:50', 1, 0, 'system:dict:detail:put', NULL, 0);
INSERT INTO `t_perm_label` VALUES (21, '2023-12-04 19:55:50', 0, '2023-12-04 19:55:50', 0, 0, 'hiker:rule_type:post', NULL, 0);
INSERT INTO `t_perm_label` VALUES (22, '2023-12-04 20:00:34', 0, '2023-12-04 20:00:34', 0, 0, 'hiker:rule:post', NULL, 0);
INSERT INTO `t_perm_label` VALUES (23, '2023-12-04 20:00:59', 0, '2023-12-04 20:00:59', 0, 0, 'hiker:rule:put', NULL, 0);
INSERT INTO `t_perm_label` VALUES (24, '2023-12-04 22:13:09', 0, '2023-12-04 22:13:09', 0, 0, 'system:config-setting:post', NULL, 0);
INSERT INTO `t_perm_label` VALUES (25, '2023-12-05 19:44:23', 0, '2023-12-05 19:44:23', 0, 0, 'monitor:server:post', NULL, 0);
INSERT INTO `t_perm_label` VALUES (26, '2023-12-05 20:08:50', 0, '2023-12-16 11:59:31', 1, 0, 'monitor:server:get', NULL, 0);
INSERT INTO `t_perm_label` VALUES (27, '2023-12-05 22:52:40', 0, '2023-12-05 22:52:40', 0, 0, 'hiker:rule_type:put', NULL, 0);
INSERT INTO `t_perm_label` VALUES (28, '2023-12-05 22:52:46', 0, '2023-12-05 22:52:46', 0, 0, 'hiker:rule_type:delete', NULL, 0);
INSERT INTO `t_perm_label` VALUES (29, '2023-12-07 00:00:33', 0, '2023-12-07 00:00:33', 0, 0, 'perm:user:delete', NULL, 0);
INSERT INTO `t_perm_label` VALUES (30, '2023-12-07 19:50:07', 0, '2023-12-07 19:50:07', 0, 0, 'report:excel_generate:get', NULL, 0);
INSERT INTO `t_perm_label` VALUES (31, '2023-12-07 21:39:27', 0, '2023-12-07 21:39:27', 0, 0, 'report:excel_generate:post', NULL, 0);
INSERT INTO `t_perm_label` VALUES (32, '2023-12-09 02:27:25', 0, '2023-12-09 02:27:25', 0, 0, 'system:config_setting:delete', NULL, 0);
INSERT INTO `t_perm_label` VALUES (33, '2023-12-09 16:20:03', 0, '2023-12-09 16:20:03', 0, 0, 'monitor:logininfor:delete', NULL, 0);
INSERT INTO `t_perm_label` VALUES (34, '2023-12-09 16:50:10', 0, '2023-12-09 16:50:10', 0, 0, 'hiker:developer:delete', NULL, 0);
INSERT INTO `t_perm_label` VALUES (35, '2023-12-09 16:54:11', 0, '2023-12-09 16:54:11', 0, 0, 'hiker:rule:delete', NULL, 0);
INSERT INTO `t_perm_label` VALUES (36, '2023-12-10 17:41:10', 0, '2023-12-10 17:41:10', 0, 0, 'monitor:job:post', NULL, 0);
INSERT INTO `t_perm_label` VALUES (37, '2023-12-10 18:16:32', 0, '2023-12-10 18:16:32', 0, 0, 'monitor:job:put', NULL, 0);
INSERT INTO `t_perm_label` VALUES (38, '2023-12-10 18:25:10', 0, '2023-12-10 18:25:10', 0, 0, 'monitor:job:delete', NULL, 0);
INSERT INTO `t_perm_label` VALUES (39, '2023-12-11 20:42:25', 0, '2023-12-11 20:42:25', 0, 0, 'perm:menu:delete', NULL, 0);
INSERT INTO `t_perm_label` VALUES (40, '2023-12-13 22:29:05', 0, '2023-12-16 11:59:41', 1, 0, 'monitor:pip:get', NULL, 0);
INSERT INTO `t_perm_label` VALUES (41, '2023-12-13 23:12:13', 0, '2023-12-13 23:12:13', 0, 0, 'monitor:pip:put', NULL, 0);
INSERT INTO `t_perm_label` VALUES (42, '2023-12-13 23:21:20', 0, '2023-12-13 23:21:20', 0, 0, 'monitor:pip:delete', NULL, 0);
INSERT INTO `t_perm_label` VALUES (43, '2023-12-13 23:28:11', 0, '2023-12-13 23:28:11', 0, 0, 'monitor:pip:post', NULL, 0);
INSERT INTO `t_perm_label` VALUES (44, '2023-12-16 11:36:07', 0, '2023-12-16 11:36:07', 0, 0, 'perm:role:put', NULL, 0);
INSERT INTO `t_perm_label` VALUES (45, '2023-12-16 11:38:40', 0, '2023-12-16 11:38:40', 0, 0, 'perm:label:put', NULL, 0);
INSERT INTO `t_perm_label` VALUES (46, '2023-12-16 12:28:44', 0, '2023-12-16 12:28:44', 0, 0, 'report:excel_generate:export', NULL, 0);
INSERT INTO `t_perm_label` VALUES (47, '2023-12-17 14:13:25', 0, '2023-12-17 14:45:14', 1, 1, 'report:excel_generate:exports', NULL, 0);
INSERT INTO `t_perm_label` VALUES (48, '2023-12-17 14:38:50', 0, '2023-12-17 14:44:57', 1, 1, 'system_user:export', NULL, 0);
INSERT INTO `t_perm_label` VALUES (49, '2023-12-17 14:44:45', 0, '2023-12-17 14:44:45', 0, 0, 'perm:user:export', NULL, 0);
INSERT INTO `t_perm_label` VALUES (50, '2023-12-17 14:44:57', 0, '2023-12-17 14:44:57', 0, 0, 'perm:label:delete', NULL, 0);
INSERT INTO `t_perm_label` VALUES (51, '2023-12-17 14:47:51', 0, '2023-12-17 14:53:44', 1, 0, 'monitor:logininfor:export', NULL, 0);
INSERT INTO `t_perm_label` VALUES (52, '2023-12-17 14:47:58', 0, '2023-12-17 14:52:03', 1, 0, 'monitor:job:export', NULL, 0);
INSERT INTO `t_perm_label` VALUES (53, '2023-12-17 16:00:22', 0, '2023-12-17 16:00:22', 0, 0, 'monitor:cache:get', NULL, 0);
INSERT INTO `t_perm_label` VALUES (54, '2023-12-17 16:47:58', 0, '2023-12-17 16:47:58', 0, 0, 'monitor:cache:delete', NULL, 0);
INSERT INTO `t_perm_label` VALUES (55, '2024-01-02 20:24:36', 0, '2024-01-02 20:24:36', 0, 0, 'system:user:export', NULL, 0);
INSERT INTO `t_perm_label` VALUES (56, '2024-01-06 12:37:09', 0, '2024-01-06 12:37:09', 0, 0, 'monitor:job-log:delete', NULL, 0);
INSERT INTO `t_perm_label` VALUES (57, '2024-01-06 13:24:14', 0, '2024-01-06 13:24:14', 0, 0, '/monitor/jobLog/export:export', NULL, 0);
INSERT INTO `t_perm_label` VALUES (58, '2024-01-06 13:36:05', 0, '2024-01-06 13:36:05', 0, 0, 'monitor:job:log:export', NULL, 0);

-- ----------------------------
-- Table structure for t_perm_label_role
-- ----------------------------
DROP TABLE IF EXISTS `t_perm_label_role`;
CREATE TABLE `t_perm_label_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `label_id` int(11) NULL DEFAULT NULL,
  `role_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `label_id`(`label_id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  INDEX `ix_t_perm_label_role_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of t_perm_label_role
-- ----------------------------
INSERT INTO `t_perm_label_role` VALUES (1, '2023-12-06 22:37:39', 0, '2023-12-06 22:37:39', 0, 0, NULL, NULL);
INSERT INTO `t_perm_label_role` VALUES (2, '2023-12-16 11:42:53', 1, '2023-12-16 11:42:53', 0, 0, 1, 2);
INSERT INTO `t_perm_label_role` VALUES (3, '2023-12-16 11:43:03', 1, '2023-12-16 11:43:03', 0, 0, 2, 2);
INSERT INTO `t_perm_label_role` VALUES (4, '2023-12-16 11:43:17', 1, '2023-12-16 11:43:17', 0, 0, 3, 2);
INSERT INTO `t_perm_label_role` VALUES (5, '2023-12-16 11:43:50', 1, '2023-12-16 11:43:50', 0, 0, 18, 2);
INSERT INTO `t_perm_label_role` VALUES (17, '2023-12-16 12:50:26', 1, '2023-12-16 12:50:26', 0, 0, 7, 2);
INSERT INTO `t_perm_label_role` VALUES (18, '2023-12-16 12:50:30', 1, '2023-12-16 12:50:30', 0, 0, 8, 2);
INSERT INTO `t_perm_label_role` VALUES (10, '2023-12-16 11:59:31', 1, '2023-12-16 11:59:31', 0, 0, 26, 2);
INSERT INTO `t_perm_label_role` VALUES (11, '2023-12-16 11:59:41', 1, '2023-12-16 11:59:41', 0, 0, 40, 2);
INSERT INTO `t_perm_label_role` VALUES (16, '2023-12-16 12:50:23', 1, '2023-12-16 12:50:23', 0, 0, 6, 2);
INSERT INTO `t_perm_label_role` VALUES (15, '2023-12-16 12:46:21', 1, '2023-12-16 12:46:21', 0, 0, 16, 2);
INSERT INTO `t_perm_label_role` VALUES (19, '2023-12-17 14:52:03', 1, '2023-12-17 14:52:03', 0, 0, 52, 2);
INSERT INTO `t_perm_label_role` VALUES (20, '2023-12-17 14:53:44', 1, '2023-12-17 14:53:44', 0, 0, 51, 2);

-- ----------------------------
-- Table structure for t_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_role_menu`;
CREATE TABLE `t_role_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `role_id` int(11) NULL DEFAULT NULL,
  `menu_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  INDEX `menu_id`(`menu_id`) USING BTREE,
  INDEX `ix_t_role_menu_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 115 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of t_role_menu
-- ----------------------------
INSERT INTO `t_role_menu` VALUES (1, '2022-11-22 00:55:04', 0, '2022-11-22 00:55:04', 0, 0, 3, 2);
INSERT INTO `t_role_menu` VALUES (2, '2022-11-22 00:55:04', 0, '2022-11-22 00:55:04', 0, 0, 3, 4);
INSERT INTO `t_role_menu` VALUES (3, '2022-11-22 00:55:04', 0, '2022-11-22 00:55:04', 0, 0, 3, 5);
INSERT INTO `t_role_menu` VALUES (4, '2022-11-22 00:55:04', 0, '2022-11-22 00:55:04', 0, 0, 3, 8);
INSERT INTO `t_role_menu` VALUES (114, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 32);
INSERT INTO `t_role_menu` VALUES (113, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 24);
INSERT INTO `t_role_menu` VALUES (112, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 20);
INSERT INTO `t_role_menu` VALUES (111, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 25);
INSERT INTO `t_role_menu` VALUES (110, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 16);
INSERT INTO `t_role_menu` VALUES (109, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 15);
INSERT INTO `t_role_menu` VALUES (108, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 30);
INSERT INTO `t_role_menu` VALUES (107, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 28);
INSERT INTO `t_role_menu` VALUES (106, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 18);
INSERT INTO `t_role_menu` VALUES (105, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 19);
INSERT INTO `t_role_menu` VALUES (104, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 17);
INSERT INTO `t_role_menu` VALUES (103, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 13);
INSERT INTO `t_role_menu` VALUES (102, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 27);
INSERT INTO `t_role_menu` VALUES (101, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 12);
INSERT INTO `t_role_menu` VALUES (100, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 11);
INSERT INTO `t_role_menu` VALUES (99, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 26);
INSERT INTO `t_role_menu` VALUES (98, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 10);
INSERT INTO `t_role_menu` VALUES (97, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 14);
INSERT INTO `t_role_menu` VALUES (96, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 4);
INSERT INTO `t_role_menu` VALUES (95, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 5);
INSERT INTO `t_role_menu` VALUES (94, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 8);
INSERT INTO `t_role_menu` VALUES (93, '2023-12-16 13:21:28', 1, '2023-12-16 13:21:28', 0, 0, 2, 2);

-- ----------------------------
-- Table structure for t_roles
-- ----------------------------
DROP TABLE IF EXISTS `t_roles`;
CREATE TABLE `t_roles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `key` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '权限标识',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '权限名称',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '顺序',
  `status` int(11) NULL DEFAULT 0 COMMENT '状态(0: 正常, 1: 停用)',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ix_t_roles_key`(`key`) USING BTREE,
  INDEX `ix_t_roles_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_roles
-- ----------------------------
INSERT INTO `t_roles` VALUES (1, '2022-11-13 02:44:13', 0, '2022-11-13 02:44:13', 0, 0, 'admin', '超级管理员', 1, 0);
INSERT INTO `t_roles` VALUES (2, '2022-11-13 02:46:33', 0, '2023-12-16 13:21:28', 1, 0, 'general', '一般用户', 2, 0);
INSERT INTO `t_roles` VALUES (3, '2022-11-22 00:55:04', 1, '2022-11-22 00:55:04', 0, 0, 'Operation', '管理员', 3, 0);

-- ----------------------------
-- Table structure for t_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `user_id` int(11) NULL DEFAULT NULL,
  `role_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  INDEX `ix_t_user_role_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of t_user_role
-- ----------------------------
INSERT INTO `t_user_role` VALUES (1, '2022-11-13 02:58:19', 0, '2022-11-13 02:58:19', 0, 0, 1, 1);
INSERT INTO `t_user_role` VALUES (3, '2022-11-22 00:50:26', 0, '2022-11-22 00:50:26', 0, 0, 3, 2);
INSERT INTO `t_user_role` VALUES (4, '2022-11-22 00:55:57', 1, '2022-11-22 00:55:57', 0, 0, 2, 3);
INSERT INTO `t_user_role` VALUES (10, '2023-12-16 11:35:26', 1, '2023-12-16 11:35:26', 0, 0, 4, 2);
INSERT INTO `t_user_role` VALUES (6, '2023-12-06 13:18:51', 0, '2023-12-06 13:18:51', 0, 0, 5, 2);
INSERT INTO `t_user_role` VALUES (28, '2024-01-02 22:29:54', 0, '2024-01-02 22:29:54', 0, 0, 6, 2);

-- ----------------------------
-- Table structure for t_users
-- ----------------------------
DROP TABLE IF EXISTS `t_users`;
CREATE TABLE `t_users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '创建时间',
  `creator_id` int(11) NULL DEFAULT 0 COMMENT '创建人id',
  `modified_time` datetime(0) NULL DEFAULT current_timestamp(0) COMMENT '更新时间',
  `modifier_id` int(11) NULL DEFAULT 0 COMMENT '修改人id',
  `is_deleted` int(11) NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=删除',
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '用户名',
  `nickname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '姓名',
  `sex` int(11) NULL DEFAULT 0 COMMENT '性别',
  `phone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '手机号',
  `email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '邮箱',
  `hashed_password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '密码',
  `avatar` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '头像',
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '状态',
  `is_active` tinyint(1) NULL DEFAULT 0 COMMENT '是否已经验证用户',
  `is_superuser` tinyint(1) NULL DEFAULT 0 COMMENT '是否超级管理员',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ix_t_users_username`(`username`) USING BTREE,
  INDEX `ix_t_users_id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_users
-- ----------------------------
INSERT INTO `t_users` VALUES (1, '2022-11-13 02:58:19', 0, '2023-12-07 22:14:30', 1, 0, 'admin', '超级管理员', 0, '12345678910', 'admin@beginner2020.top', '$2b$12$nlyWZAzu4C9cgbHV/FE1X.nwBKiGemATgCxikPQEQVznMqBCrDw/e', 'images/avatar/5ce5f4fa-ff60-47c0-9414-d332b12b99b3.', 0, 1, 1);
INSERT INTO `t_users` VALUES (2, '2022-11-22 00:48:34', 0, '2022-11-22 00:55:57', 1, 0, 'opt', 'opt', 0, '12345678911', 'opt@beginner2020.top', '$2b$12$EbJD0X5U0LwAvf5EVvYxZO20Jyv2xLKU1quekOyX3SwhdVepz1RFu', NULL, 0, 1, 0);
INSERT INTO `t_users` VALUES (3, '2022-11-22 00:50:26', 0, '2023-12-09 16:47:45', 1, 0, 'user', NULL, 0, '12345678912', 'user@beginner2020.top', '$2b$12$Wov4niPCoLOeBcRNgGDNhekSZBgB/GAhYs25CLHfJG.me1KbFP0am', NULL, 0, 1, 0);
INSERT INTO `t_users` VALUES (4, '2023-12-02 15:36:42', 1, '2023-12-16 13:16:49', 4, 0, 'hjdhnx', '道长', 2, '13154671296', '434857005@qq.com', '$2b$12$X3LQ2VXThey.YB/WGlwYq.35CKOeKkBgmA6TTR91q/VYe6hGDAWRO', 'images/avatar/f84e9577-9047-470e-bcde-16173ca1811c.jpg', 0, 1, 0);
INSERT INTO `t_users` VALUES (5, '2024-01-02 21:35:02', 0, '2024-01-02 21:38:43', 0, 0, 'admin1', '超级管理员1', 0, '12345678910', 'admin1@beginner2020.top', '$2b$12$s1WlihU/PaMhW0T2H360Me8IswCyKtep8p.kQcV3z9QVdS7natYL.', NULL, 0, 1, 0);
INSERT INTO `t_users` VALUES (6, '2024-01-02 21:41:41', 0, '2024-01-02 22:29:54', 0, 0, 'admin2', '超级管理员2', 0, '12345678910', 'admin2@beginner2020.top', '$2b$12$1JuTbUoZ4KkgNzCG1h6/9OzOLQ2NOU9g.fdPy5OHtrhFUBvBa31bO', NULL, 0, 1, 0);

SET FOREIGN_KEY_CHECKS = 1;
