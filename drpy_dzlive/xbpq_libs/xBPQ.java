//
// Decompiled by Jadx - 1652ms
//
/* [1284] JadxRuntimeException in pass: BlockProcessor in method: com.github.catvod.spider.xBPQ.f2(java.lang.String, java.lang.String, boolean, java.util.HashMap<java.lang.String, java.lang.String>):org.json.JSONObject, file: memory-file
jadx.core.utils.exceptions.JadxRuntimeException: Unreachable block: B:145:0x0439
	at jadx.core.dex.visitors.blocks.BlockProcessor.checkForUnreachableBlocks(BlockProcessor.java:92)
	at jadx.core.dex.visitors.blocks.BlockProcessor.processBlocksTree(BlockProcessor.java:52)
	at jadx.core.dex.visitors.blocks.BlockProcessor.visit(BlockProcessor.java:44)
	at jadx.core.dex.visitors.DepthTraversal.visit(DepthTraversal.java:26)
	at jadx.core.dex.visitors.DepthTraversal.lambda$visit$1(DepthTraversal.java:14)
	at java.util.ArrayList.forEach(ArrayList.java:1259)
	at jadx.core.dex.visitors.DepthTraversal.visit(DepthTraversal.java:14)
	at jadx.core.ProcessClass.process(ProcessClass.java:72)
	at jadx.core.ProcessClass.generateCode(ProcessClass.java:111)
	at jadx.core.dex.nodes.ClassNode.decompile(ClassNode.java:381)
	at jadx.core.dex.nodes.ClassNode.getCode(ClassNode.java:331)
	at bin.decompiler.Jadx.decompile(Jadx.java:27)
	at bin.decompiler.DecompilerUtil.decompile(DecompilerUtil.java:33)
	at bin.decompiler.Jadx.main(Jadx.java:13)
[3569] JadxRuntimeException in pass: BlockProcessor in method: com.github.catvod.spider.xBPQ.detailContent(java.util.List<java.lang.String>):java.lang.String, file: memory-file
jadx.core.utils.exceptions.JadxRuntimeException: Unreachable block: B:131:0x03fb
	at jadx.core.dex.visitors.blocks.BlockProcessor.checkForUnreachableBlocks(BlockProcessor.java:92)
	at jadx.core.dex.visitors.blocks.BlockProcessor.processBlocksTree(BlockProcessor.java:52)
	at jadx.core.dex.visitors.blocks.BlockProcessor.visit(BlockProcessor.java:44)
	at jadx.core.dex.visitors.DepthTraversal.visit(DepthTraversal.java:26)
	at jadx.core.dex.visitors.DepthTraversal.lambda$visit$1(DepthTraversal.java:14)
	at java.util.ArrayList.forEach(ArrayList.java:1259)
	at jadx.core.dex.visitors.DepthTraversal.visit(DepthTraversal.java:14)
	at jadx.core.ProcessClass.process(ProcessClass.java:72)
	at jadx.core.ProcessClass.generateCode(ProcessClass.java:111)
	at jadx.core.dex.nodes.ClassNode.decompile(ClassNode.java:381)
	at jadx.core.dex.nodes.ClassNode.getCode(ClassNode.java:331)
	at bin.decompiler.Jadx.decompile(Jadx.java:27)
	at bin.decompiler.DecompilerUtil.decompile(DecompilerUtil.java:33)
	at bin.decompiler.Jadx.main(Jadx.java:13)
[1284] Method code generation error in method: com.github.catvod.spider.xBPQ.f2(java.lang.String, java.lang.String, boolean, java.util.HashMap<java.lang.String, java.lang.String>):org.json.JSONObject, file: memory-file
java.lang.NullPointerException
	at jadx.core.codegen.RegionGen.declareVars(RegionGen.java:66)
	at jadx.core.codegen.RegionGen.makeRegion(RegionGen.java:61)
	at jadx.core.codegen.MethodGen.addRegionInsns(MethodGen.java:290)
	at jadx.core.codegen.MethodGen.addInstructions(MethodGen.java:274)
	at jadx.core.codegen.ClassGen.addMethodCode(ClassGen.java:371)
	at jadx.core.codegen.ClassGen.addMethod(ClassGen.java:306)
	at jadx.core.codegen.ClassGen.lambda$addInnerClsAndMethods$2(ClassGen.java:272)
	at java.util.stream.ForEachOps$ForEachOp$OfRef.accept(ForEachOps.java:184)
	at java.util.ArrayList.forEach(ArrayList.java:1259)
	at java.util.stream.SortedOps$RefSortingSink.end(SortedOps.java:390)
	at java.util.stream.Sink$ChainedReference.end(Sink.java:258)
	at java.util.stream.Sink$ChainedReference.end(Sink.java:258)
	at java.util.stream.AbstractPipeline.copyInto(AbstractPipeline.java:483)
	at java.util.stream.AbstractPipeline.wrapAndCopyInto(AbstractPipeline.java:472)
	at java.util.stream.ForEachOps$ForEachOp.evaluateSequential(ForEachOps.java:151)
	at java.util.stream.ForEachOps$ForEachOp$OfRef.evaluateSequential(ForEachOps.java:174)
	at java.util.stream.AbstractPipeline.evaluate(AbstractPipeline.java:234)
	at java.util.stream.ReferencePipeline.forEach(ReferencePipeline.java:418)
	at jadx.core.codegen.ClassGen.addInnerClsAndMethods(ClassGen.java:268)
	at jadx.core.codegen.ClassGen.addClassBody(ClassGen.java:258)
	at jadx.core.codegen.ClassGen.addClassBody(ClassGen.java:242)
	at jadx.core.codegen.ClassGen.addClassCode(ClassGen.java:133)
	at jadx.core.codegen.ClassGen.makeClass(ClassGen.java:96)
	at jadx.core.codegen.CodeGen.wrapCodeGen(CodeGen.java:32)
	at jadx.core.codegen.CodeGen.generateJavaCode(CodeGen.java:27)
	at jadx.core.codegen.CodeGen.generate(CodeGen.java:20)
	at jadx.core.ProcessClass.process(ProcessClass.java:77)
	at jadx.core.ProcessClass.generateCode(ProcessClass.java:111)
	at jadx.core.dex.nodes.ClassNode.decompile(ClassNode.java:381)
	at jadx.core.dex.nodes.ClassNode.getCode(ClassNode.java:331)
	at bin.decompiler.Jadx.decompile(Jadx.java:27)
	at bin.decompiler.DecompilerUtil.decompile(DecompilerUtil.java:33)
	at bin.decompiler.Jadx.main(Jadx.java:13)
[3569] Method code generation error in method: com.github.catvod.spider.xBPQ.detailContent(java.util.List<java.lang.String>):java.lang.String, file: memory-file
java.lang.NullPointerException
	at jadx.core.codegen.RegionGen.declareVars(RegionGen.java:66)
	at jadx.core.codegen.RegionGen.makeRegion(RegionGen.java:61)
	at jadx.core.codegen.MethodGen.addRegionInsns(MethodGen.java:290)
	at jadx.core.codegen.MethodGen.addInstructions(MethodGen.java:274)
	at jadx.core.codegen.ClassGen.addMethodCode(ClassGen.java:371)
	at jadx.core.codegen.ClassGen.addMethod(ClassGen.java:306)
	at jadx.core.codegen.ClassGen.lambda$addInnerClsAndMethods$2(ClassGen.java:272)
	at java.util.stream.ForEachOps$ForEachOp$OfRef.accept(ForEachOps.java:184)
	at java.util.ArrayList.forEach(ArrayList.java:1259)
	at java.util.stream.SortedOps$RefSortingSink.end(SortedOps.java:390)
	at java.util.stream.Sink$ChainedReference.end(Sink.java:258)
	at java.util.stream.Sink$ChainedReference.end(Sink.java:258)
	at java.util.stream.AbstractPipeline.copyInto(AbstractPipeline.java:483)
	at java.util.stream.AbstractPipeline.wrapAndCopyInto(AbstractPipeline.java:472)
	at java.util.stream.ForEachOps$ForEachOp.evaluateSequential(ForEachOps.java:151)
	at java.util.stream.ForEachOps$ForEachOp$OfRef.evaluateSequential(ForEachOps.java:174)
	at java.util.stream.AbstractPipeline.evaluate(AbstractPipeline.java:234)
	at java.util.stream.ReferencePipeline.forEach(ReferencePipeline.java:418)
	at jadx.core.codegen.ClassGen.addInnerClsAndMethods(ClassGen.java:268)
	at jadx.core.codegen.ClassGen.addClassBody(ClassGen.java:258)
	at jadx.core.codegen.ClassGen.addClassBody(ClassGen.java:242)
	at jadx.core.codegen.ClassGen.addClassCode(ClassGen.java:133)
	at jadx.core.codegen.ClassGen.makeClass(ClassGen.java:96)
	at jadx.core.codegen.CodeGen.wrapCodeGen(CodeGen.java:32)
	at jadx.core.codegen.CodeGen.generateJavaCode(CodeGen.java:27)
	at jadx.core.codegen.CodeGen.generate(CodeGen.java:20)
	at jadx.core.ProcessClass.process(ProcessClass.java:77)
	at jadx.core.ProcessClass.generateCode(ProcessClass.java:111)
	at jadx.core.dex.nodes.ClassNode.decompile(ClassNode.java:381)
	at jadx.core.dex.nodes.ClassNode.getCode(ClassNode.java:331)
	at bin.decompiler.Jadx.decompile(Jadx.java:27)
	at bin.decompiler.DecompilerUtil.decompile(DecompilerUtil.java:33)
	at bin.decompiler.Jadx.main(Jadx.java:13)
*/
package com.github.catvod.spider;

import android.content.Context;
import android.text.TextUtils;
import android.util.Base64;
import com.github.catvod.crawler.Spider;
import com.github.catvod.crawler.SpiderDebug;
import com.github.catvod.spider.merge.Df;
import com.github.catvod.spider.merge.WN;
import com.github.catvod.spider.merge.bI;
import com.github.catvod.spider.merge.hf;
import com.github.catvod.spider.merge.if;
import com.github.catvod.spider.merge.k;
import com.github.catvod.spider.merge.wA;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import okhttp3.Response;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class xBPQ extends Spider {
    private static String F;
    private static final byte[] Hq = {-17, -69, -65};
    private static HashMap<String, String> g5 = null;
    private int A;
    private String e;
    private boolean f2 = false;
    private boolean TT = false;
    private boolean AJ = false;
    private boolean S = false;
    private boolean sB = false;
    private List<String> T = null;
    private boolean y = false;
    protected JSONObject X = null;
    private String q4 = "";
    private boolean Ry = false;

    private String AJ(String str) {
        String str2;
        String str3;
        if (!Hq("编码").isEmpty()) {
            try {
                if (F.contains(">")) {
                    str2 = F.split(">")[0];
                    str3 = F.split(">")[1];
                } else {
                    str2 = "UTF-8";
                    str3 = F;
                }
                return new String(jM(str.getBytes(str2)), str3);
            } catch (UnsupportedEncodingException unused) {
            }
        }
        return str;
    }

    private JSONObject F(String str, String str2, String str3) {
        String[] split;
        try {
            JSONObject jSONObject = new JSONObject();
            JSONArray jSONArray = new JSONArray();
            if (!str.equals("by") && !str.equals("cateId")) {
                jSONObject.put("n", "全部");
                jSONObject.put("v", "");
                jSONArray.put(jSONObject);
                jSONObject = new JSONObject();
            }
            if (str.equals("cateId")) {
                jSONObject.put("n", "全部");
                jSONObject.put("v", str3.split("--")[0]);
                jSONArray.put(jSONObject);
                jSONObject = new JSONObject();
                str3 = str3.split("--")[1];
            }
            if (str3.contains("#")) {
                for (String str4 : str3.split("#")) {
                    jSONObject.put("n", str4.split("\\$")[0]);
                    jSONObject.put("v", str4.split("\\$")[1]);
                    jSONArray.put(jSONObject);
                    jSONObject = new JSONObject();
                }
            } else {
                jSONObject.put("n", str3.split("\\$")[0]);
                jSONObject.put("v", str3.split("\\$")[1]);
                jSONArray.put(jSONObject);
            }
            JSONObject jSONObject2 = new JSONObject();
            jSONObject2.put("key", str);
            jSONObject2.put("name", str2);
            jSONObject2.put("value", jSONArray);
            return jSONObject2;
        } catch (Exception e) {
            SpiderDebug.log(e);
            return null;
        }
    }

    private String Hq(String str) {
        return g5(str, "");
    }

    private String NO(String str, String str2) {
        for (int i = 0; i < 3; i++) {
            if (str2.contains("检测中") && str2.contains("跳转中") && str2.contains("btwaf")) {
                Z(str2, "btwaf=", "\"").get(0);
                str2 = S(str);
            }
            if (!(str2.contains("检测中") || str2.contains("btwaf"))) {
                return str2;
            }
        }
        return str2;
    }

    /* JADX WARN: Removed duplicated region for block: B:19:0x0091  */
    /* JADX WARN: Removed duplicated region for block: B:28:0x012b  */
    /*
        Code decompiled incorrectly, please refer to instructions dump.
    */
    private String P(String str, String str2, String str3) {
        String[] split;
        String str4;
        String str5;
        String replaceAll = str2.replaceAll(".*<序号>(.*)", "$1");
        String replaceAll2 = str2.replaceAll("<序号>.*", "");
        if (str.contains("[替换:")) {
            String replaceAll3 = str.replaceAll(".*\\[替换:(.*?)\\].*", "$1").replaceAll("<序号>", replaceAll);
            if (!replaceAll3.isEmpty()) {
                for (String str6 : replaceAll3.split("#")) {
                    if (!str6.contains(">>>")) {
                        str4 = str6.split(">>")[0];
                        if (!str6.split(">>")[1].equals("空")) {
                            str5 = str6.split(">>")[1];
                            if (!str4.contains("*")) {
                                String A = A(str4.split("\\*")[0]);
                                String A2 = A(str4.split("\\*")[1]);
                                if (!str5.contains("*")) {
                                    replaceAll2 = replaceAll2.replaceAll(A(A) + "([\\S\\s]*?)" + A(A2), str5);
                                } else {
                                    Matcher matcher = Pattern.compile(A(str5.split("\\*")[0]) + "([\\S\\s]*?)" + A(str5.split("\\*")[1])).matcher(str3);
                                    while (true) {
                                        if (matcher.find()) {
                                            String group = matcher.group(1);
                                            if (group.length() > 0) {
                                                replaceAll2 = replaceAll2.replaceAll(A(A) + "([\\S\\s]*?)" + A(A2), group);
                                                break;
                                            }
                                        }
                                    }
                                }
                            } else if (replaceAll2.contains(str4)) {
                                replaceAll2 = replaceAll2.replaceAll(A(str4), str5);
                            }
                        }
                        str5 = "";
                        if (!str4.contains("*")) {
                        }
                    } else {
                        str4 = str6.split(">>>")[0] + ">";
                        if (!str6.split(">>>")[1].equals("空")) {
                            str5 = str6.split(">>>")[1];
                            if (!str4.contains("*")) {
                            }
                        }
                        str5 = "";
                        if (!str4.contains("*")) {
                        }
                    }
                }
            }
        }
        return replaceAll2;
    }

    private String QQ(String str, String str2, String str3) {
        return g5(str, g5(str2, str3));
    }

    private static String Rq(String str) {
        Matcher matcher = Pattern.compile("(\\\\u(\\w{4}))").matcher(str);
        while (matcher.find()) {
            String group = matcher.group(1);
            str = str.replace(group, ((char) Integer.parseInt(matcher.group(2), 16)) + "");
        }
        return str.replaceAll("\\\\", "");
    }

    /* JADX WARN: Removed duplicated region for block: B:119:0x023e A[Catch: all -> 0x024e, TryCatch #0 {all -> 0x024e, blocks: (B:8:0x0029, B:10:0x0030, B:12:0x0036, B:14:0x003c, B:16:0x0040, B:18:0x0048, B:19:0x0050, B:21:0x0057, B:23:0x0066, B:26:0x0072, B:28:0x007c, B:30:0x0082, B:31:0x008a, B:33:0x0090, B:34:0x0096, B:36:0x009c, B:37:0x00a2, B:40:0x00ac, B:41:0x00b2, B:42:0x00d9, B:43:0x00f8, B:45:0x00fe, B:48:0x0125, B:50:0x0131, B:52:0x0139, B:59:0x014c, B:62:0x0153, B:64:0x015b, B:66:0x0167, B:68:0x016f, B:71:0x0179, B:74:0x017f, B:75:0x0183, B:78:0x018d, B:80:0x0199, B:82:0x01a2, B:84:0x01aa, B:85:0x01ba, B:89:0x01ca, B:90:0x01cf, B:93:0x01d9, B:97:0x01e6, B:98:0x01eb, B:100:0x01f3, B:102:0x01ff, B:104:0x0209, B:106:0x0211, B:107:0x021d, B:111:0x022a, B:112:0x022d, B:115:0x0236, B:119:0x023e, B:120:0x0242), top: B:128:0x0029 }] */
    /* JADX WARN: Removed duplicated region for block: B:120:0x0242 A[Catch: all -> 0x024e, TRY_LEAVE, TryCatch #0 {all -> 0x024e, blocks: (B:8:0x0029, B:10:0x0030, B:12:0x0036, B:14:0x003c, B:16:0x0040, B:18:0x0048, B:19:0x0050, B:21:0x0057, B:23:0x0066, B:26:0x0072, B:28:0x007c, B:30:0x0082, B:31:0x008a, B:33:0x0090, B:34:0x0096, B:36:0x009c, B:37:0x00a2, B:40:0x00ac, B:41:0x00b2, B:42:0x00d9, B:43:0x00f8, B:45:0x00fe, B:48:0x0125, B:50:0x0131, B:52:0x0139, B:59:0x014c, B:62:0x0153, B:64:0x015b, B:66:0x0167, B:68:0x016f, B:71:0x0179, B:74:0x017f, B:75:0x0183, B:78:0x018d, B:80:0x0199, B:82:0x01a2, B:84:0x01aa, B:85:0x01ba, B:89:0x01ca, B:90:0x01cf, B:93:0x01d9, B:97:0x01e6, B:98:0x01eb, B:100:0x01f3, B:102:0x01ff, B:104:0x0209, B:106:0x0211, B:107:0x021d, B:111:0x022a, B:112:0x022d, B:115:0x0236, B:119:0x023e, B:120:0x0242), top: B:128:0x0029 }] */
    /* JADX WARN: Removed duplicated region for block: B:59:0x014c A[Catch: all -> 0x024e, TRY_ENTER, TryCatch #0 {all -> 0x024e, blocks: (B:8:0x0029, B:10:0x0030, B:12:0x0036, B:14:0x003c, B:16:0x0040, B:18:0x0048, B:19:0x0050, B:21:0x0057, B:23:0x0066, B:26:0x0072, B:28:0x007c, B:30:0x0082, B:31:0x008a, B:33:0x0090, B:34:0x0096, B:36:0x009c, B:37:0x00a2, B:40:0x00ac, B:41:0x00b2, B:42:0x00d9, B:43:0x00f8, B:45:0x00fe, B:48:0x0125, B:50:0x0131, B:52:0x0139, B:59:0x014c, B:62:0x0153, B:64:0x015b, B:66:0x0167, B:68:0x016f, B:71:0x0179, B:74:0x017f, B:75:0x0183, B:78:0x018d, B:80:0x0199, B:82:0x01a2, B:84:0x01aa, B:85:0x01ba, B:89:0x01ca, B:90:0x01cf, B:93:0x01d9, B:97:0x01e6, B:98:0x01eb, B:100:0x01f3, B:102:0x01ff, B:104:0x0209, B:106:0x0211, B:107:0x021d, B:111:0x022a, B:112:0x022d, B:115:0x0236, B:119:0x023e, B:120:0x0242), top: B:128:0x0029 }] */
    /* JADX WARN: Removed duplicated region for block: B:62:0x0153 A[Catch: all -> 0x024e, TryCatch #0 {all -> 0x024e, blocks: (B:8:0x0029, B:10:0x0030, B:12:0x0036, B:14:0x003c, B:16:0x0040, B:18:0x0048, B:19:0x0050, B:21:0x0057, B:23:0x0066, B:26:0x0072, B:28:0x007c, B:30:0x0082, B:31:0x008a, B:33:0x0090, B:34:0x0096, B:36:0x009c, B:37:0x00a2, B:40:0x00ac, B:41:0x00b2, B:42:0x00d9, B:43:0x00f8, B:45:0x00fe, B:48:0x0125, B:50:0x0131, B:52:0x0139, B:59:0x014c, B:62:0x0153, B:64:0x015b, B:66:0x0167, B:68:0x016f, B:71:0x0179, B:74:0x017f, B:75:0x0183, B:78:0x018d, B:80:0x0199, B:82:0x01a2, B:84:0x01aa, B:85:0x01ba, B:89:0x01ca, B:90:0x01cf, B:93:0x01d9, B:97:0x01e6, B:98:0x01eb, B:100:0x01f3, B:102:0x01ff, B:104:0x0209, B:106:0x0211, B:107:0x021d, B:111:0x022a, B:112:0x022d, B:115:0x0236, B:119:0x023e, B:120:0x0242), top: B:128:0x0029 }] */
    /* JADX WARN: Removed duplicated region for block: B:97:0x01e6 A[Catch: all -> 0x024e, TryCatch #0 {all -> 0x024e, blocks: (B:8:0x0029, B:10:0x0030, B:12:0x0036, B:14:0x003c, B:16:0x0040, B:18:0x0048, B:19:0x0050, B:21:0x0057, B:23:0x0066, B:26:0x0072, B:28:0x007c, B:30:0x0082, B:31:0x008a, B:33:0x0090, B:34:0x0096, B:36:0x009c, B:37:0x00a2, B:40:0x00ac, B:41:0x00b2, B:42:0x00d9, B:43:0x00f8, B:45:0x00fe, B:48:0x0125, B:50:0x0131, B:52:0x0139, B:59:0x014c, B:62:0x0153, B:64:0x015b, B:66:0x0167, B:68:0x016f, B:71:0x0179, B:74:0x017f, B:75:0x0183, B:78:0x018d, B:80:0x0199, B:82:0x01a2, B:84:0x01aa, B:85:0x01ba, B:89:0x01ca, B:90:0x01cf, B:93:0x01d9, B:97:0x01e6, B:98:0x01eb, B:100:0x01f3, B:102:0x01ff, B:104:0x0209, B:106:0x0211, B:107:0x021d, B:111:0x022a, B:112:0x022d, B:115:0x0236, B:119:0x023e, B:120:0x0242), top: B:128:0x0029 }] */
    /* JADX WARN: Removed duplicated region for block: B:98:0x01eb A[Catch: all -> 0x024e, TryCatch #0 {all -> 0x024e, blocks: (B:8:0x0029, B:10:0x0030, B:12:0x0036, B:14:0x003c, B:16:0x0040, B:18:0x0048, B:19:0x0050, B:21:0x0057, B:23:0x0066, B:26:0x0072, B:28:0x007c, B:30:0x0082, B:31:0x008a, B:33:0x0090, B:34:0x0096, B:36:0x009c, B:37:0x00a2, B:40:0x00ac, B:41:0x00b2, B:42:0x00d9, B:43:0x00f8, B:45:0x00fe, B:48:0x0125, B:50:0x0131, B:52:0x0139, B:59:0x014c, B:62:0x0153, B:64:0x015b, B:66:0x0167, B:68:0x016f, B:71:0x0179, B:74:0x017f, B:75:0x0183, B:78:0x018d, B:80:0x0199, B:82:0x01a2, B:84:0x01aa, B:85:0x01ba, B:89:0x01ca, B:90:0x01cf, B:93:0x01d9, B:97:0x01e6, B:98:0x01eb, B:100:0x01f3, B:102:0x01ff, B:104:0x0209, B:106:0x0211, B:107:0x021d, B:111:0x022a, B:112:0x022d, B:115:0x0236, B:119:0x023e, B:120:0x0242), top: B:128:0x0029 }] */
    /*
        Code decompiled incorrectly, please refer to instructions dump.
    */
    private ArrayList<String> Z(String str, String str2, String str3) {
        int i;
        String str4;
        String str5;
        int i2;
        String str6;
        boolean z;
        boolean z2;
        xBPQ xbpq = this;
        String str7 = str;
        String str8 = str2;
        ArrayList<String> arrayList = new ArrayList<>();
        if (!str2.isEmpty() || !str3.isEmpty()) {
            try {
                i = 1;
            } catch (Throwable th) {
                th.printStackTrace();
            }
            if (str8.contains("&&") || str2.length() <= 1 || str3.length() >= 1) {
                if (str8.contains("[&&]")) {
                    str8 = str8.replaceAll("\\[\\&\\&\\]", "左括号\\&\\&右括号");
                }
                if (str8.contains("&&")) {
                    str4 = str8.split("\\&\\&")[1];
                    str8 = str8.split("\\&\\&")[0];
                } else {
                    str4 = str3;
                }
                if (str8.contains("[")) {
                    str5 = str8.replaceAll(".*(\\[.*)", "$1");
                    str8 = str8.replaceAll("\\[.*", "");
                } else {
                    str5 = "";
                }
                if (str4.contains("[")) {
                    str5 = str4.replaceAll(".*(\\[.*)", "$1");
                    str4 = str4.replaceAll("\\[.*", "");
                }
                if (str8.contains("左括号")) {
                    str8 = str8.replaceAll("左括号", "\\[");
                }
                if (str4.contains("右括号")) {
                    str8 = str8.replaceAll("右括号", "\\]");
                }
                if (!str8.contains("*")) {
                    str6 = xbpq.A(str8);
                    i2 = 1;
                } else {
                    str6 = xbpq.A(str8.split("\\*")[0]) + "([\\S\\s]*?)" + xbpq.A(str8.split("\\*")[1]);
                    i2 = 2;
                }
                Matcher matcher = Pattern.compile(str6 + "([\\S\\s]*?)" + xbpq.A(str4)).matcher(str7);
                int i3 = 0;
                while (matcher.find()) {
                    i3 += i;
                    String P = xbpq.P(str5, matcher.group(i2) + "<序号>" + i3, str7);
                    if (str5.contains("[包含:")) {
                        String replaceAll = str5.replaceAll(".*\\[包含:(.*?)\\].*", "$1");
                        if (!replaceAll.isEmpty()) {
                            for (String str9 : replaceAll.split("#")) {
                                if (!P.contains(str9)) {
                                }
                            }
                            z = false;
                            if (z) {
                                arrayList.add("不要");
                            } else {
                                if (str5.contains("[不包含:")) {
                                    String replaceAll2 = str5.replaceAll(".*\\[不包含:(.*?)\\].*", "$1");
                                    if (!replaceAll2.isEmpty()) {
                                        String[] split = replaceAll2.split("#");
                                        int length = split.length;
                                        int i4 = 0;
                                        while (true) {
                                            if (i4 >= length) {
                                                z = true;
                                                break;
                                            } else if (P.contains(split[i4])) {
                                                z = false;
                                                break;
                                            } else {
                                                i4++;
                                            }
                                        }
                                    }
                                }
                                if (!z) {
                                    arrayList.add("不要");
                                } else {
                                    if (str5.contains("[含序号:")) {
                                        String replaceAll3 = str5.replaceAll(".*\\[含序号:(.*?)\\].*", "$1");
                                        if (!replaceAll3.isEmpty()) {
                                            String[] split2 = replaceAll3.split("#");
                                            int length2 = split2.length;
                                            int i5 = 0;
                                            boolean z3 = false;
                                            while (true) {
                                                if (i5 >= length2) {
                                                    matcher = matcher;
                                                    z = z3;
                                                    break;
                                                }
                                                String str10 = split2[i5];
                                                if (!str10.contains("-")) {
                                                    matcher = matcher;
                                                    if (Integer.parseInt(str10) == i3) {
                                                        z = true;
                                                        break;
                                                    }
                                                } else {
                                                    String[] split3 = str10.split("-");
                                                    int parseInt = Integer.parseInt(split3[0]);
                                                    matcher = matcher;
                                                    while (true) {
                                                        if (parseInt > Integer.parseInt(split3[1])) {
                                                            break;
                                                        } else if (parseInt == i3) {
                                                            z3 = true;
                                                            break;
                                                        } else {
                                                            parseInt++;
                                                            split3 = split3;
                                                        }
                                                    }
                                                }
                                                i5++;
                                            }
                                            if (z) {
                                                arrayList.add("不要");
                                                xbpq = this;
                                                str7 = str;
                                                i = 1;
                                            } else {
                                                if (str5.contains("[不含序号:")) {
                                                    String replaceAll4 = str5.replaceAll(".*\\[不含序号:(.*?)\\].*", "$1");
                                                    if (!replaceAll4.isEmpty()) {
                                                        String[] split4 = replaceAll4.split("#");
                                                        int length3 = split4.length;
                                                        int i6 = 0;
                                                        z2 = true;
                                                        while (true) {
                                                            if (i6 >= length3) {
                                                                break;
                                                            }
                                                            String str11 = split4[i6];
                                                            if (str11.contains("-")) {
                                                                String[] split5 = str11.split("-");
                                                                int parseInt2 = Integer.parseInt(split5[0]);
                                                                while (true) {
                                                                    if (parseInt2 > Integer.parseInt(split5[1])) {
                                                                        break;
                                                                    } else if (parseInt2 == i3) {
                                                                        z2 = false;
                                                                        break;
                                                                    } else {
                                                                        parseInt2++;
                                                                    }
                                                                }
                                                            } else if (Integer.parseInt(str11) == i3) {
                                                                z2 = false;
                                                                break;
                                                            }
                                                            i6++;
                                                        }
                                                        if (z2) {
                                                            arrayList.add("不要");
                                                        } else {
                                                            arrayList.add(P);
                                                        }
                                                        xbpq = this;
                                                        str7 = str;
                                                        i = 1;
                                                    }
                                                }
                                                z2 = z;
                                                if (z2) {
                                                }
                                                xbpq = this;
                                                str7 = str;
                                                i = 1;
                                            }
                                        }
                                    }
                                    matcher = matcher;
                                    if (z) {
                                    }
                                }
                            }
                            matcher = matcher;
                            xbpq = this;
                            str7 = str;
                            i = 1;
                        }
                    }
                    z = true;
                    if (z) {
                    }
                    matcher = matcher;
                    xbpq = this;
                    str7 = str;
                    i = 1;
                }
                if (arrayList.isEmpty()) {
                    arrayList.add("");
                }
                return arrayList;
            }
            arrayList.add(str8);
            return arrayList;
        }
        arrayList.add(str7);
        return arrayList;
    }

    private String a(String str, String str2, String str3, String str4, String str5) {
        return g5(str, g5(str2, g5(str3, g5(str4, str5))));
    }

    private JSONArray e(String str, String str2, String str3, String str4, String str5) {
        try {
            JSONArray jSONArray = new JSONArray();
            if (!str.equals("0") && str.contains("$")) {
                jSONArray.put(F("cateId", "类型", str));
            }
            if (!str2.equals("0") && str2.contains("$")) {
                jSONArray.put(F("class", "剧情", str2));
            }
            if (!str3.equals("0") && str3.contains("$")) {
                jSONArray.put(F("area", "地区", str3));
            }
            if (!str4.equals("0") && str4.contains("-")) {
                int parseInt = Integer.parseInt(str4.split("-")[1]);
                int parseInt2 = Integer.parseInt(str4.split("-")[0]);
                if (parseInt2 > parseInt) {
                    parseInt2 = parseInt;
                    parseInt = parseInt2;
                }
                String str6 = "";
                while (parseInt >= parseInt2) {
                    if (parseInt == parseInt2) {
                        str6 = str6 + String.valueOf(parseInt) + "$" + String.valueOf(parseInt);
                    } else {
                        str6 = str6 + String.valueOf(parseInt) + "$" + String.valueOf(parseInt) + "#";
                    }
                    parseInt--;
                }
                jSONArray.put(F("year", "年份", str6));
            }
            if (!str5.equals("0") && str5.contains("$")) {
                jSONArray.put(F("by", "排序", str5));
            }
            return jSONArray;
        } catch (Exception e) {
            SpiderDebug.log(e);
            return null;
        }
    }

    private String e5(String str, String str2, String str3, String str4) {
        return g5(str, g5(str2, g5(str3, str4)));
    }

    /*  JADX ERROR: JadxRuntimeException in pass: BlockProcessor
        jadx.core.utils.exceptions.JadxRuntimeException: Unreachable block: B:145:0x0439
        	at jadx.core.dex.visitors.blocks.BlockProcessor.checkForUnreachableBlocks(BlockProcessor.java:92)
        	at jadx.core.dex.visitors.blocks.BlockProcessor.processBlocksTree(BlockProcessor.java:52)
        	at jadx.core.dex.visitors.blocks.BlockProcessor.visit(BlockProcessor.java:44)
        */
    private org.json.JSONObject f2(java.lang.String r30, java.lang.String r31, boolean r32, java.util.HashMap<java.lang.String, java.lang.String> r33) {
        /*  JADX ERROR: JadxRuntimeException in pass: BlockProcessor
            jadx.core.utils.exceptions.JadxRuntimeException: Unreachable block: B:145:0x0439
            	at jadx.core.dex.visitors.blocks.BlockProcessor.checkForUnreachableBlocks(BlockProcessor.java:92)
            	at jadx.core.dex.visitors.blocks.BlockProcessor.processBlocksTree(BlockProcessor.java:52)
            */
        /*  JADX ERROR: Method code generation error
            java.lang.NullPointerException
            	at jadx.core.codegen.RegionGen.declareVars(RegionGen.java:66)
            	at jadx.core.codegen.RegionGen.makeRegion(RegionGen.java:61)
            	at jadx.core.codegen.MethodGen.addRegionInsns(MethodGen.java:290)
            	at jadx.core.codegen.MethodGen.addInstructions(MethodGen.java:274)
            	at jadx.core.codegen.ClassGen.addMethodCode(ClassGen.java:371)
            	at jadx.core.codegen.ClassGen.addMethod(ClassGen.java:306)
            	at jadx.core.codegen.ClassGen.lambda$addInnerClsAndMethods$2(ClassGen.java:272)
            	at java.util.stream.ForEachOps$ForEachOp$OfRef.accept(ForEachOps.java:184)
            	at java.util.ArrayList.forEach(ArrayList.java:1259)
            	at java.util.stream.SortedOps$RefSortingSink.end(SortedOps.java:390)
            	at java.util.stream.Sink$ChainedReference.end(Sink.java:258)
            */
        /*
            Method dump skipped, instructions count: 1284
            To view this dump change 'Code comments level' option to 'DEBUG'
        */
        throw new UnsupportedOperationException("Method not decompiled: com.github.catvod.spider.xBPQ.f2(java.lang.String, java.lang.String, boolean, java.util.HashMap):org.json.JSONObject");
    }

    private String g5(String str, String str2) {
        String optString = this.X.optString(str);
        if (str.equals("主页url") && optString.isEmpty()) {
            optString = this.X.optString("url");
            if (optString.isEmpty()) {
                optString = this.X.optString("homeUrl");
                if (optString.isEmpty()) {
                    String optString2 = this.X.optString("分类url");
                    if (optString2.isEmpty()) {
                        optString2 = this.X.optString("分类页");
                        if (optString2.isEmpty()) {
                            optString2 = this.X.optString("class_url");
                            if (optString2.isEmpty()) {
                                optString2 = this.X.optString("cateUrl");
                                if (optString2.isEmpty()) {
                                    optString2 = this.X.optString("搜索url");
                                }
                            }
                        }
                    }
                    optString = optString2.replaceAll(".*(https?\\://[^/]+)/.*", "$1");
                }
            }
        }
        if (str.equals("分类") && optString.isEmpty()) {
            optString = this.X.optString("class_name");
            if (!optString.isEmpty()) {
                String[] split = optString.split("\\&");
                String[] split2 = this.X.optString("class_value").split("\\&");
                String str3 = "";
                int i = 0;
                while (i < split.length) {
                    str3 = str3 + split[i] + "$" + split2[i] + (i < split.length + (-1) ? "#" : "");
                    i++;
                }
                optString = str3;
            }
        }
        return (optString.isEmpty() || optString.equals("空")) ? (!str.equals("搜索后缀") || !optString.equals("空")) ? str2 : "" : optString;
    }

    /* JADX WARN: Code restructure failed: missing block: B:9:0x0019, code lost:
        if (r6[2] == r4[2]) goto L11;
     */
    /*
        Code decompiled incorrectly, please refer to instructions dump.
    */
    static byte[] jM(byte[] bArr) {
        boolean z = true;
        if (bArr.length > 3) {
            byte b = bArr[0];
            byte[] bArr2 = Hq;
            if (b == bArr2[0]) {
                if (bArr[1] == bArr2[1]) {
                }
            }
        }
        z = false;
        if (!z) {
            return bArr;
        }
        byte[] bArr3 = new byte[bArr.length - 3];
        System.arraycopy(bArr, 3, bArr3, 0, bArr.length - 3);
        return bArr3;
    }

    public static Object[] loadPic(Map<String, String> map) {
        try {
            String str = map.get("site");
            String str2 = map.get("pic");
            if (g5 == null) {
                HashMap<String, String> hashMap = new HashMap<>();
                g5 = hashMap;
                hashMap.put("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36");
                g5.put("referer", str);
            }
            xBPQ$2 r1 = new xBPQ$2();
            wA.AJ(wA.e(), str2, (Map) null, g5, r1);
            if (((Response) r1.getResult()).code() == 200) {
                String str3 = ((Response) r1.getResult()).headers().get("Content-Type");
                if (str3 == null) {
                    str3 = "application/octet-stream";
                }
                System.out.println(str2);
                System.out.println(str3);
                return new Object[]{200, str3, ((Response) r1.getResult()).body().byteStream()};
            }
        } catch (Throwable th) {
            th.printStackTrace();
        }
        return null;
    }

    /* JADX WARN: Removed duplicated region for block: B:39:0x00f2 A[Catch: Exception -> 0x02ae, TryCatch #0 {Exception -> 0x02ae, blocks: (B:3:0x0008, B:6:0x0034, B:8:0x003a, B:10:0x0040, B:14:0x004e, B:16:0x0054, B:18:0x006f, B:20:0x0088, B:22:0x0094, B:24:0x00a6, B:26:0x00b8, B:27:0x00c7, B:29:0x00cf, B:31:0x00db, B:33:0x00e1, B:37:0x00ea, B:39:0x00f2, B:41:0x00fe, B:43:0x010e, B:45:0x0120, B:46:0x012f, B:48:0x0135, B:50:0x0141, B:53:0x0149, B:55:0x0156, B:58:0x015e, B:61:0x0171, B:63:0x0177, B:65:0x017f, B:68:0x0187, B:70:0x018f, B:72:0x01a9, B:74:0x01af, B:76:0x01b9, B:78:0x01cb, B:79:0x01e0, B:83:0x01fe, B:85:0x020e, B:86:0x0221, B:88:0x0237, B:89:0x0247, B:90:0x024b, B:92:0x0251, B:94:0x0260, B:96:0x0266, B:98:0x026e, B:100:0x0282, B:101:0x0290, B:104:0x029b, B:105:0x02a7), top: B:111:0x0008 }] */
    /* JADX WARN: Removed duplicated region for block: B:50:0x0141 A[Catch: Exception -> 0x02ae, TryCatch #0 {Exception -> 0x02ae, blocks: (B:3:0x0008, B:6:0x0034, B:8:0x003a, B:10:0x0040, B:14:0x004e, B:16:0x0054, B:18:0x006f, B:20:0x0088, B:22:0x0094, B:24:0x00a6, B:26:0x00b8, B:27:0x00c7, B:29:0x00cf, B:31:0x00db, B:33:0x00e1, B:37:0x00ea, B:39:0x00f2, B:41:0x00fe, B:43:0x010e, B:45:0x0120, B:46:0x012f, B:48:0x0135, B:50:0x0141, B:53:0x0149, B:55:0x0156, B:58:0x015e, B:61:0x0171, B:63:0x0177, B:65:0x017f, B:68:0x0187, B:70:0x018f, B:72:0x01a9, B:74:0x01af, B:76:0x01b9, B:78:0x01cb, B:79:0x01e0, B:83:0x01fe, B:85:0x020e, B:86:0x0221, B:88:0x0237, B:89:0x0247, B:90:0x024b, B:92:0x0251, B:94:0x0260, B:96:0x0266, B:98:0x026e, B:100:0x0282, B:101:0x0290, B:104:0x029b, B:105:0x02a7), top: B:111:0x0008 }] */
    /* JADX WARN: Removed duplicated region for block: B:55:0x0156 A[Catch: Exception -> 0x02ae, TryCatch #0 {Exception -> 0x02ae, blocks: (B:3:0x0008, B:6:0x0034, B:8:0x003a, B:10:0x0040, B:14:0x004e, B:16:0x0054, B:18:0x006f, B:20:0x0088, B:22:0x0094, B:24:0x00a6, B:26:0x00b8, B:27:0x00c7, B:29:0x00cf, B:31:0x00db, B:33:0x00e1, B:37:0x00ea, B:39:0x00f2, B:41:0x00fe, B:43:0x010e, B:45:0x0120, B:46:0x012f, B:48:0x0135, B:50:0x0141, B:53:0x0149, B:55:0x0156, B:58:0x015e, B:61:0x0171, B:63:0x0177, B:65:0x017f, B:68:0x0187, B:70:0x018f, B:72:0x01a9, B:74:0x01af, B:76:0x01b9, B:78:0x01cb, B:79:0x01e0, B:83:0x01fe, B:85:0x020e, B:86:0x0221, B:88:0x0237, B:89:0x0247, B:90:0x024b, B:92:0x0251, B:94:0x0260, B:96:0x0266, B:98:0x026e, B:100:0x0282, B:101:0x0290, B:104:0x029b, B:105:0x02a7), top: B:111:0x0008 }] */
    /* JADX WARN: Removed duplicated region for block: B:61:0x0171 A[Catch: Exception -> 0x02ae, TRY_ENTER, TryCatch #0 {Exception -> 0x02ae, blocks: (B:3:0x0008, B:6:0x0034, B:8:0x003a, B:10:0x0040, B:14:0x004e, B:16:0x0054, B:18:0x006f, B:20:0x0088, B:22:0x0094, B:24:0x00a6, B:26:0x00b8, B:27:0x00c7, B:29:0x00cf, B:31:0x00db, B:33:0x00e1, B:37:0x00ea, B:39:0x00f2, B:41:0x00fe, B:43:0x010e, B:45:0x0120, B:46:0x012f, B:48:0x0135, B:50:0x0141, B:53:0x0149, B:55:0x0156, B:58:0x015e, B:61:0x0171, B:63:0x0177, B:65:0x017f, B:68:0x0187, B:70:0x018f, B:72:0x01a9, B:74:0x01af, B:76:0x01b9, B:78:0x01cb, B:79:0x01e0, B:83:0x01fe, B:85:0x020e, B:86:0x0221, B:88:0x0237, B:89:0x0247, B:90:0x024b, B:92:0x0251, B:94:0x0260, B:96:0x0266, B:98:0x026e, B:100:0x0282, B:101:0x0290, B:104:0x029b, B:105:0x02a7), top: B:111:0x0008 }] */
    /* JADX WARN: Removed duplicated region for block: B:70:0x018f A[Catch: Exception -> 0x02ae, TryCatch #0 {Exception -> 0x02ae, blocks: (B:3:0x0008, B:6:0x0034, B:8:0x003a, B:10:0x0040, B:14:0x004e, B:16:0x0054, B:18:0x006f, B:20:0x0088, B:22:0x0094, B:24:0x00a6, B:26:0x00b8, B:27:0x00c7, B:29:0x00cf, B:31:0x00db, B:33:0x00e1, B:37:0x00ea, B:39:0x00f2, B:41:0x00fe, B:43:0x010e, B:45:0x0120, B:46:0x012f, B:48:0x0135, B:50:0x0141, B:53:0x0149, B:55:0x0156, B:58:0x015e, B:61:0x0171, B:63:0x0177, B:65:0x017f, B:68:0x0187, B:70:0x018f, B:72:0x01a9, B:74:0x01af, B:76:0x01b9, B:78:0x01cb, B:79:0x01e0, B:83:0x01fe, B:85:0x020e, B:86:0x0221, B:88:0x0237, B:89:0x0247, B:90:0x024b, B:92:0x0251, B:94:0x0260, B:96:0x0266, B:98:0x026e, B:100:0x0282, B:101:0x0290, B:104:0x029b, B:105:0x02a7), top: B:111:0x0008 }] */
    /* JADX WARN: Removed duplicated region for block: B:88:0x0237 A[Catch: Exception -> 0x02ae, LOOP:4: B:87:0x0235->B:88:0x0237, LOOP_END, TryCatch #0 {Exception -> 0x02ae, blocks: (B:3:0x0008, B:6:0x0034, B:8:0x003a, B:10:0x0040, B:14:0x004e, B:16:0x0054, B:18:0x006f, B:20:0x0088, B:22:0x0094, B:24:0x00a6, B:26:0x00b8, B:27:0x00c7, B:29:0x00cf, B:31:0x00db, B:33:0x00e1, B:37:0x00ea, B:39:0x00f2, B:41:0x00fe, B:43:0x010e, B:45:0x0120, B:46:0x012f, B:48:0x0135, B:50:0x0141, B:53:0x0149, B:55:0x0156, B:58:0x015e, B:61:0x0171, B:63:0x0177, B:65:0x017f, B:68:0x0187, B:70:0x018f, B:72:0x01a9, B:74:0x01af, B:76:0x01b9, B:78:0x01cb, B:79:0x01e0, B:83:0x01fe, B:85:0x020e, B:86:0x0221, B:88:0x0237, B:89:0x0247, B:90:0x024b, B:92:0x0251, B:94:0x0260, B:96:0x0266, B:98:0x026e, B:100:0x0282, B:101:0x0290, B:104:0x029b, B:105:0x02a7), top: B:111:0x0008 }] */
    /* JADX WARN: Removed duplicated region for block: B:92:0x0251 A[Catch: Exception -> 0x02ae, TryCatch #0 {Exception -> 0x02ae, blocks: (B:3:0x0008, B:6:0x0034, B:8:0x003a, B:10:0x0040, B:14:0x004e, B:16:0x0054, B:18:0x006f, B:20:0x0088, B:22:0x0094, B:24:0x00a6, B:26:0x00b8, B:27:0x00c7, B:29:0x00cf, B:31:0x00db, B:33:0x00e1, B:37:0x00ea, B:39:0x00f2, B:41:0x00fe, B:43:0x010e, B:45:0x0120, B:46:0x012f, B:48:0x0135, B:50:0x0141, B:53:0x0149, B:55:0x0156, B:58:0x015e, B:61:0x0171, B:63:0x0177, B:65:0x017f, B:68:0x0187, B:70:0x018f, B:72:0x01a9, B:74:0x01af, B:76:0x01b9, B:78:0x01cb, B:79:0x01e0, B:83:0x01fe, B:85:0x020e, B:86:0x0221, B:88:0x0237, B:89:0x0247, B:90:0x024b, B:92:0x0251, B:94:0x0260, B:96:0x0266, B:98:0x026e, B:100:0x0282, B:101:0x0290, B:104:0x029b, B:105:0x02a7), top: B:111:0x0008 }] */
    /*
        Code decompiled incorrectly, please refer to instructions dump.
    */
    private JSONObject q4() {
        CharSequence charSequence;
        String str;
        String str2;
        String Hq2;
        String str3;
        String Hq3;
        String Hq4;
        Iterator it;
        boolean z;
        String str4;
        int length;
        int i;
        Object obj;
        boolean z2;
        String str5;
        try {
            String g52 = g5("类型", "0");
            String Hq5 = Hq("剧情");
            Object obj2 = "0";
            if (!Hq5.equals("1") && !Hq5.isEmpty() && !Hq5.contains("替换") && !Hq5.contains("追加")) {
                str = g52;
                charSequence = "追加";
                str2 = Hq5;
                Hq2 = Hq("地区");
                if (!Hq2.equals("1") && !Hq2.isEmpty() && !Hq2.contains("替换")) {
                    str3 = Hq2;
                    Hq3 = Hq("年份");
                    if (!Hq3.equals("1") || Hq3.isEmpty()) {
                        Hq3 = "2010-2022";
                    }
                    Hq4 = Hq("排序");
                    if (!Hq4.equals("1") || Hq4.isEmpty()) {
                        Hq4 = "时间$time#人气$hits#评分$score";
                    }
                    JSONObject jSONObject = new JSONObject();
                    JSONArray jSONArray = new JSONArray();
                    String str6 = "--";
                    if (str2.contains("||") && (!str2.contains("||") || (!str2.contains(charSequence) && !str2.contains("替换")))) {
                        String[] split = str2.split("\\|\\|");
                        length = split.length;
                        for (i = 0; i < length; i++) {
                            String str7 = split[i];
                            String str8 = str7.split(str6)[0];
                            String str9 = str7.split(str6)[1];
                            if (str.equals(obj2) || str.isEmpty()) {
                                split = split;
                            } else {
                                String[] split2 = str.split("\\|\\|");
                                int length2 = split2.length;
                                split = split;
                                int i2 = 0;
                                while (i2 < length2) {
                                    String str10 = split2[i2];
                                    if (str8.equals(str10.split(str6)[0])) {
                                        length = length;
                                        str = str;
                                        str6 = str6;
                                        jSONArray = e(str10, str9, str3, Hq3, Hq4);
                                        obj = obj2;
                                        z2 = false;
                                        break;
                                    }
                                    i2++;
                                    length2 = length2;
                                    length = length;
                                    jSONArray = jSONArray;
                                    str6 = str6;
                                }
                            }
                            obj = obj2;
                            str = str;
                            z2 = true;
                            if (z2) {
                                obj2 = obj;
                                jSONArray = e("0", str9, str3, Hq3, Hq4);
                            } else {
                                obj2 = obj;
                            }
                            jSONObject.put(str8, jSONArray);
                        }
                        return jSONObject;
                    }
                    String str11 = str6;
                    Object obj3 = obj2;
                    String str12 = this.e;
                    ArrayList arrayList = new ArrayList();
                    for (String str13 : str12.split("#")) {
                        arrayList.add(str13.split("\\$")[1]);
                    }
                    it = arrayList.iterator();
                    while (it.hasNext()) {
                        String str14 = (String) it.next();
                        if (!str.equals(obj3) && !str.isEmpty()) {
                            String[] split3 = str.split("\\|\\|");
                            int length3 = split3.length;
                            int i3 = 0;
                            while (i3 < length3) {
                                String str15 = split3[i3];
                                obj3 = obj3;
                                String[] split4 = str15.split(str11);
                                str11 = str11;
                                if (str14.equals(split4[0])) {
                                    str4 = str14;
                                    jSONArray = e(str15, str2, str3, Hq3, Hq4);
                                    z = false;
                                    break;
                                }
                                i3++;
                                obj3 = obj3;
                            }
                        }
                        str4 = str14;
                        z = true;
                        if (z) {
                            jSONArray = e("0", str2, str3, Hq3, Hq4);
                        }
                        jSONObject.put(str4, jSONArray);
                    }
                    return jSONObject;
                }
                str3 = "大陆$大陆#香港$香港#台湾$台湾#美国$美国#日本$日本#韩国$韩国#英国$英国#法国$法国#德国$德国#印度$印度#泰国$泰国#加拿大$加拿大#俄罗斯$俄罗斯#意大利$意大利#西班牙$西班牙";
                if (Hq2.contains("替换")) {
                    String[] split5 = Hq2.replaceAll(".*替换\\[(.*)\\].*", "$1").split("\\|\\|");
                    int length4 = split5.length;
                    int i4 = 0;
                    while (i4 < length4) {
                        String str16 = split5[i4];
                        str3 = !str16.split(">>")[1].equals("空") ? str3.replace(str16.split(">>")[0], str16.split(">>")[1]) : str3.replace(str16.split(">>")[0], "").replace("##", "#");
                        i4++;
                        split5 = split5;
                    }
                }
                Hq3 = Hq("年份");
                if (!Hq3.equals("1")) {
                }
                Hq3 = "2010-2022";
                Hq4 = Hq("排序");
                if (!Hq4.equals("1")) {
                }
                Hq4 = "时间$time#人气$hits#评分$score";
                JSONObject jSONObject2 = new JSONObject();
                JSONArray jSONArray2 = new JSONArray();
                String str62 = "--";
                if (str2.contains("||")) {
                    String[] split6 = str2.split("\\|\\|");
                    length = split6.length;
                    while (i < length) {
                    }
                    return jSONObject2;
                }
                String str112 = str62;
                Object obj32 = obj2;
                String str122 = this.e;
                ArrayList arrayList2 = new ArrayList();
                while (r5 < r4) {
                }
                it = arrayList2.iterator();
                while (it.hasNext()) {
                }
                return jSONObject2;
            }
            if (Hq5.contains("追加")) {
                StringBuilder sb = new StringBuilder();
                sb.append("#");
                str = g52;
                sb.append(Hq5.replaceAll(".*追加\\[(.*)\\].*", "$1"));
                str5 = sb.toString();
            } else {
                str = g52;
                str5 = "";
            }
            StringBuilder sb2 = new StringBuilder();
            charSequence = "追加";
            sb2.append("古装$古装#战争$战争#爱情$爱情#喜剧$喜剧#科幻$科幻#犯罪$犯罪#动作$动作#奇幻$奇幻#剧情$剧情#历史$历史#悬疑$悬疑#恐怖$恐怖#冒险$冒险#武侠$武侠");
            sb2.append(str5);
            str2 = sb2.toString();
            if (Hq5.contains("替换")) {
                String[] split7 = Hq5.replaceAll(".*替换\\[(.*)\\].*", "$1").split("\\|\\|");
                int length5 = split7.length;
                int i5 = 0;
                while (i5 < length5) {
                    String str17 = split7[i5];
                    str2 = !str17.split(">>")[1].equals("空") ? str2.replace(str17.split(">>")[0], str17.split(">>")[1]) : str2.replace(str17.split(">>")[0], "").replace("##", "#");
                    i5++;
                    length5 = length5;
                    split7 = split7;
                }
            }
            Hq2 = Hq("地区");
            if (!Hq2.equals("1")) {
                str3 = Hq2;
                Hq3 = Hq("年份");
                if (!Hq3.equals("1")) {
                }
                Hq3 = "2010-2022";
                Hq4 = Hq("排序");
                if (!Hq4.equals("1")) {
                }
                Hq4 = "时间$time#人气$hits#评分$score";
                JSONObject jSONObject22 = new JSONObject();
                JSONArray jSONArray22 = new JSONArray();
                String str622 = "--";
                if (str2.contains("||")) {
                }
                String str1122 = str622;
                Object obj322 = obj2;
                String str1222 = this.e;
                ArrayList arrayList22 = new ArrayList();
                while (r5 < r4) {
                }
                it = arrayList22.iterator();
                while (it.hasNext()) {
                }
                return jSONObject22;
            }
            str3 = "大陆$大陆#香港$香港#台湾$台湾#美国$美国#日本$日本#韩国$韩国#英国$英国#法国$法国#德国$德国#印度$印度#泰国$泰国#加拿大$加拿大#俄罗斯$俄罗斯#意大利$意大利#西班牙$西班牙";
            if (Hq2.contains("替换")) {
            }
            Hq3 = Hq("年份");
            if (!Hq3.equals("1")) {
            }
            Hq3 = "2010-2022";
            Hq4 = Hq("排序");
            if (!Hq4.equals("1")) {
            }
            Hq4 = "时间$time#人气$hits#评分$score";
            JSONObject jSONObject222 = new JSONObject();
            JSONArray jSONArray222 = new JSONArray();
            String str6222 = "--";
            if (str2.contains("||")) {
            }
            String str11222 = str6222;
            Object obj3222 = obj2;
            String str12222 = this.e;
            ArrayList arrayList222 = new ArrayList();
            while (r5 < r4) {
            }
            it = arrayList222.iterator();
            while (it.hasNext()) {
            }
            return jSONObject222;
        } catch (Exception e) {
            SpiderDebug.log(e);
            return null;
        }
    }

    /* JADX WARN: Multi-variable type inference failed */
    /* JADX WARN: Type inference failed for: r2v17 */
    /* JADX WARN: Type inference failed for: r2v2 */
    /* JADX WARN: Type inference failed for: r2v3 */
    private String y() {
        String str;
        Exception e;
        String str2;
        JSONObject optJSONObject;
        String Hq2 = Hq("分类");
        try {
            if (Hq2.contains("$")) {
                this.e = Hq2;
                return Hq2;
            }
            String str3 = "";
            if (Hq("分类数组").contains("&&")) {
                try {
                    if (!Hq("分类数组").startsWith("//")) {
                        if (this.f2) {
                            this.f2 = false;
                            str2 = S(Hq("主页url"));
                            this.f2 = true;
                        } else {
                            str2 = S(Hq("主页url"));
                        }
                        String str4 = !Hq("分类二次截取").isEmpty() ? Z(str2, Hq("分类二次截取"), str3).get(0) : str2;
                        if (!str4.isEmpty()) {
                            str2 = str4;
                        }
                        ArrayList<String> Z = Z(str2, Hq("分类数组"), str3);
                        String str5 = str3;
                        for (int i = 0; i < Z.size(); i++) {
                            if (!Z.get(i).equals("不要")) {
                                String trim = Z(Z.get(i), Hq("分类标题"), ">&&<").get(0).replaceAll("\\&[a-zA-Z]{1,10};", str3).replaceAll("<[^>]*>", str3).replaceAll("[(/>)<]", str3).trim();
                                String str6 = Z(Z.get(i), Hq("分类ID"), "href=\"&&\"").get(0);
                                if (!trim.equals("不要") && !trim.isEmpty() && !str6.isEmpty()) {
                                    if (this.y) {
                                        trim = "xb:" + str6;
                                    }
                                    str5 = str5 + trim + "$" + str6 + "#";
                                }
                            }
                        }
                        String substring = str5.substring(0, str5.length() - 1);
                        this.e = substring;
                        return substring;
                    }
                } catch (Exception e2) {
                    e = e2;
                    str = "电影$1#连续剧$2#综艺$3#动漫$4";
                    SpiderDebug.log(e);
                    this.e = str;
                    return str;
                }
            }
            if (Hq("cateManual").isEmpty() || (optJSONObject = this.X.optJSONObject("cateManual")) == null) {
                WN E8 = E8(Hq("主页url"));
                if (Hq2.length() < 1) {
                    Hq2 = "无码";
                }
                if (!Hq2.startsWith("//")) {
                    Hq2 = "//ul[contains(//text(),'电影') or contains(//text(),'" + Hq2 + "')][1]//a[not(contains(text(),'页') or contains(text(),'资') or contains(text(),'留言') or contains(text(),'私人') or contains(text(),'影院') or contains(text(),'网') or contains(text(),'专题') or contains(text(),'推荐') or contains(text(),'下载'))]";
                }
                List TT = E8.TT(Hq2);
                String str7 = str3;
                for (int i2 = 0; i2 < TT.size(); i2++) {
                    String trim2 = ((Df) TT.get(i2)).sB(QQ("分类标题", "cateName", "/text()")).TT().trim();
                    if (trim2.length() <= 9 && !str7.contains(trim2)) {
                        String trim3 = ((Df) TT.get(i2)).sB(QQ("分类ID", "cateId", "/@href")).TT().trim();
                        if (trim3.contains("search")) {
                            str7 = str7 + trim2 + "$" + trim2 + "#";
                        } else {
                            if (trim3.startsWith("http")) {
                                trim3 = trim3.replaceAll(Hq("主页url"), str3);
                            }
                            if (trim3.length() >= 2 && trim3.contains("/")) {
                                if (trim3.endsWith("/")) {
                                    trim3 = trim3.substring(0, trim3.length() - 1);
                                }
                                if (trim3.endsWith(".html")) {
                                    trim3 = trim3.substring(0, trim3.length() - 5);
                                }
                                if (trim3.endsWith("-1")) {
                                    trim3 = trim3.substring(0, trim3.length() - 2);
                                }
                                if (!trim3.contains("//")) {
                                    trim3 = trim3.substring(trim3.lastIndexOf("/") + 1, trim3.length());
                                }
                                if (trim3.length() >= 1 && trim2.length() >= 2) {
                                    if (this.y) {
                                        trim2 = "xp:" + trim3;
                                    }
                                    str7 = str7 + trim2 + "$" + trim3 + "#";
                                }
                            }
                        }
                    }
                }
                str = 6;
                try {
                    if (str7.length() < 6) {
                        this.e = "电影$1#连续剧$2#综艺$3#动漫$4";
                        return "电影$1#连续剧$2#综艺$3#动漫$4";
                    }
                    String substring2 = str7.substring(0, str7.length() - 1);
                    this.e = substring2;
                    return substring2;
                } catch (Exception e3) {
                    e = e3;
                    SpiderDebug.log(e);
                    this.e = str;
                    return str;
                }
            } else {
                Iterator<String> keys = optJSONObject.keys();
                while (keys.hasNext()) {
                    String next = keys.next();
                    str3 = str3 + next.trim() + "$" + optJSONObject.getString(next).trim() + "#";
                }
                String substring3 = str3.substring(0, str3.length() - 1);
                this.e = substring3;
                return substring3;
            }
        } catch (Exception e4) {
            e = e4;
            str = "电影$1#连续剧$2#综艺$3#动漫$4";
        }
    }

    String A(String str) {
        if (!str.isEmpty()) {
            String[] strArr = {"\\", "$", "(", ")", "*", "+", ".", "[", "]", "?", "^", "{", "}", "|"};
            for (int i = 0; i < 14; i++) {
                String str2 = strArr[i];
                if (str.contains(str2)) {
                    str = str.replace(str2, "\\" + str2);
                }
            }
        }
        return str;
    }

    protected WN E8(String str) {
        String str2;
        if (str.contains(";post")) {
            str2 = sB("xp" + str);
        } else {
            str2 = S("xp" + str.split(";")[0]);
        }
        return WN.f2(str2);
    }

    protected HashMap<String, String> Ry(String str) {
        String[] split;
        HashMap<String, String> hashMap = new HashMap<>();
        String trim = e5("请求头", "ua", "UserAgent", "").trim();
        if (trim.equals("手机")) {
            trim = "Mozilla/5.0 (Linux; Android 11; Ghxi Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/76.0.3809.89 Mobile Safari/537.36";
        }
        if (trim.isEmpty() || trim.equals("电脑")) {
            trim = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36";
        }
        hashMap.put("User-Agent", trim);
        if (this.q4.length() > 0) {
            hashMap.put("Cookie", this.q4);
        }
        if (!Hq("Referer").isEmpty()) {
            hashMap.put("Referer", Hq("Referer"));
        }
        String QQ = QQ("头部集合", "User", "");
        if (QQ.contains("$")) {
            for (String str2 : QQ.split("#")) {
                hashMap.put(str2.split("\\$")[0], " " + str2.split("\\$")[1]);
            }
        }
        return hashMap;
    }

    protected String S(String str) {
        SpiderDebug.log(str);
        boolean startsWith = str.startsWith("xp");
        if (startsWith) {
            str = str.replaceAll("xp(http.*)", "$1");
        }
        String Rq = Rq(AJ(NO(str, wA.q4(str, Ry(str)))));
        return startsWith ? Rq : Rq.replace(" ", "空空空").replaceAll("\\s", "").replace("空空空", " ");
    }

    protected String T(String str, String str2) {
        try {
            return "proxy://do=xbpq&site=" + str2 + "&pic=" + str;
        } catch (Exception e) {
            SpiderDebug.log(e);
            return str;
        }
    }

    protected String TT(String str, String str2, boolean z, HashMap<String, String> hashMap) {
        String a = a("分类url", "分类页", "class_url", "cateUrl", "");
        String e5 = e5("起始页", "qishiye", "firstpage", "1");
        if (a.contains("[") || a.contains("|")) {
            a = str2.equals(e5) ? a.replaceAll(".*[\\[|\\|].*(http[^\\]]*)\\]?.*", "$1").replace("firstPage=", "") : a.replaceAll("\\|\\|", "\\|").replaceAll("(.*)[\\[|\\|].*", "$1");
        }
        if (z && this.TT && hashMap != null && hashMap.size() > 0) {
            for (String str3 : hashMap.keySet()) {
                String str4 = hashMap.get(str3);
                if (str4.length() > 0) {
                    a = a.replace("{" + str3 + "}", URLEncoder.encode(str4));
                }
            }
        }
        String replace = a.replace("{cateId}", str).replace("{catePg}", str2);
        Matcher matcher = Pattern.compile("\\{(.*?)\\}").matcher(replace);
        while (matcher.find()) {
            String replace2 = matcher.group(0).replace("{", "").replace("}", "");
            String replace3 = replace.replace(matcher.group(0), "");
            replace = replace3.replace("/" + replace2 + "/", "");
        }
        return replace;
    }

    /* JADX WARN: Removed duplicated region for block: B:5:0x0020  */
    /*
        Code decompiled incorrectly, please refer to instructions dump.
    */
    protected void X() {
        String Hq2 = Hq("主页url");
        HashMap hashMap = new HashMap();
        wA.Ry(Hq2, Ry(Hq2), hashMap);
        for (Map.Entry entry : hashMap.entrySet()) {
            if (((String) entry.getKey()).equals("set-cookie") || ((String) entry.getKey()).equals("Set-Cookie")) {
                this.q4 = TextUtils.join("; ", (Iterable) entry.getValue());
                return;
            }
            while (r0.hasNext()) {
            }
        }
    }

    public String categoryContent(String str, String str2, boolean z, HashMap<String, String> hashMap) {
        JSONObject f2 = f2(str, str2, z, hashMap);
        return f2 != null ? f2.toString() : "";
    }

    /*  JADX ERROR: JadxRuntimeException in pass: BlockProcessor
        jadx.core.utils.exceptions.JadxRuntimeException: Unreachable block: B:131:0x03fb
        	at jadx.core.dex.visitors.blocks.BlockProcessor.checkForUnreachableBlocks(BlockProcessor.java:92)
        	at jadx.core.dex.visitors.blocks.BlockProcessor.processBlocksTree(BlockProcessor.java:52)
        	at jadx.core.dex.visitors.blocks.BlockProcessor.visit(BlockProcessor.java:44)
        */
    public java.lang.String detailContent(java.util.List<java.lang.String> r48) {
        /*  JADX ERROR: JadxRuntimeException in pass: BlockProcessor
            jadx.core.utils.exceptions.JadxRuntimeException: Unreachable block: B:131:0x03fb
            	at jadx.core.dex.visitors.blocks.BlockProcessor.checkForUnreachableBlocks(BlockProcessor.java:92)
            	at jadx.core.dex.visitors.blocks.BlockProcessor.processBlocksTree(BlockProcessor.java:52)
            */
        /*  JADX ERROR: Method code generation error
            java.lang.NullPointerException
            	at jadx.core.codegen.RegionGen.declareVars(RegionGen.java:66)
            	at jadx.core.codegen.RegionGen.makeRegion(RegionGen.java:61)
            	at jadx.core.codegen.MethodGen.addRegionInsns(MethodGen.java:290)
            	at jadx.core.codegen.MethodGen.addInstructions(MethodGen.java:274)
            	at jadx.core.codegen.ClassGen.addMethodCode(ClassGen.java:371)
            	at jadx.core.codegen.ClassGen.addMethod(ClassGen.java:306)
            	at jadx.core.codegen.ClassGen.lambda$addInnerClsAndMethods$2(ClassGen.java:272)
            	at java.util.stream.ForEachOps$ForEachOp$OfRef.accept(ForEachOps.java:184)
            	at java.util.ArrayList.forEach(ArrayList.java:1259)
            	at java.util.stream.SortedOps$RefSortingSink.end(SortedOps.java:390)
            	at java.util.stream.Sink$ChainedReference.end(Sink.java:258)
            */
        /*
            Method dump skipped, instructions count: 3569
            To view this dump change 'Code comments level' option to 'DEBUG'
        */
        throw new UnsupportedOperationException("Method not decompiled: com.github.catvod.spider.xBPQ.detailContent(java.util.List):java.lang.String");
    }

    /* JADX WARN: Removed duplicated region for block: B:52:0x010a A[Catch: Exception -> 0x0114, TryCatch #0 {Exception -> 0x0114, blocks: (B:3:0x000e, B:5:0x002a, B:6:0x0032, B:9:0x0038, B:10:0x0059, B:13:0x006a, B:16:0x0075, B:19:0x007f, B:23:0x008a, B:26:0x00a0, B:28:0x00a6, B:32:0x00af, B:35:0x00b5, B:37:0x00bb, B:41:0x00c4, B:42:0x00c9, B:44:0x00ed, B:46:0x00f3, B:47:0x00f8, B:48:0x00fc, B:50:0x0103, B:52:0x010a, B:53:0x010f), top: B:58:0x000e }] */
    /*
        Code decompiled incorrectly, please refer to instructions dump.
    */
    public String homeContent(boolean z) {
        String str = "筛选";
        try {
            JSONObject jSONObject = new JSONObject();
            JSONArray jSONArray = new JSONArray();
            String[] split = Hq("fenlei").split("#");
            if (Hq("fenlei").isEmpty()) {
                split = y().split("#");
            }
            boolean z2 = false;
            for (String str2 : split) {
                String[] split2 = str2.split("\\$");
                JSONObject jSONObject2 = new JSONObject();
                jSONObject2.put("type_name", split2[0]);
                jSONObject2.put("type_id", split2[1]);
                jSONArray.put(jSONObject2);
            }
            jSONObject.put("class", jSONArray);
            if (this.X.optJSONObject(str) == null && Hq(str).isEmpty()) {
                str = this.X.optJSONObject("filter") != null ? "filter" : this.X.optJSONObject("filterdata") != null ? "filterdata" : "";
            }
            Object optJSONObject = this.X.optJSONObject(str);
            String Hq2 = Hq(str);
            if (Hq2.equals("1") || Hq2.startsWith("http") || Hq2.startsWith("clan") || optJSONObject != null) {
                z2 = true;
            }
            this.TT = z2;
            if (z && z2) {
                if (!Hq2.startsWith("http") && !Hq2.startsWith("clan")) {
                    if (optJSONObject == null) {
                        optJSONObject = q4();
                    }
                    if (optJSONObject != null) {
                        jSONObject.put("filters", optJSONObject);
                    }
                }
                InetAddress localHost = InetAddress.getLocalHost();
                String str3 = "http://" + localHost.getHostAddress() + ":9978/file/";
                if (Hq2.startsWith("clan://")) {
                    Hq2 = Hq2.startsWith("clan://localhost/") ? Hq2.replace("clan://localhost/", str3) : Hq2.replace("clan://", str3);
                }
                String q4 = wA.q4(Hq2, (Map) null);
                if (q4 != null) {
                    optJSONObject = new JSONObject(q4);
                }
                if (optJSONObject != null) {
                }
            }
            return jSONObject.toString();
        } catch (Exception e) {
            SpiderDebug.log(e);
            return "";
        }
    }

    public String homeVideoContent() {
        try {
            if (this.A > 0) {
                this.AJ = true;
                JSONObject f2 = f2("", "", false, new HashMap<>());
                this.AJ = false;
                return f2.toString();
            }
        } catch (Exception e) {
            SpiderDebug.log(e);
        }
        return "";
    }

    public void init(Context context) {
        xBPQ.super.init(context);
    }

    public void init(Context context, String str) {
        String str2 = "s://";
        xBPQ.super.init(context, str);
        if (str != null) {
            try {
                if (str.startsWith("http")) {
                    if (!str.contains("{cateId}")) {
                        this.X = new JSONObject(wA.q4(str, (Map) null));
                    } else {
                        JSONObject jSONObject = new JSONObject();
                        this.X = jSONObject;
                        jSONObject.put("分类url", str);
                    }
                } else if (str.startsWith("{")) {
                    this.X = new JSONObject(str);
                } else {
                    String replaceAll = str.replaceAll(str2, "s//").replaceAll("p://", "p//").replaceAll("包含:", "包含").replaceAll("替换:", "替换").replaceAll("序号:", "序号").replaceAll("排序:", "排序").replaceAll("script:", "script");
                    this.X = new JSONObject();
                    String str3 = ":";
                    if (!replaceAll.contains(",")) {
                        this.X.put(replaceAll.split(str3)[0], replaceAll.split(str3)[1].replace("s//", str2).replaceAll("p//", "p://").replaceAll("包含", "包含:").replaceAll("替换", "替换:").replaceAll("序号", "序号:").replaceAll("排序", "排序:").replaceAll("script", "script:"));
                    } else {
                        String str4 = "script:";
                        String[] split = replaceAll.split(",");
                        int length = split.length;
                        String str5 = "script";
                        int i = 0;
                        while (i < length) {
                            String str6 = split[i];
                            this.X.put(str6.split(str3)[0], str6.split(str3)[1].replace("s//", str2).replaceAll("p//", "p://").replaceAll("包含", "包含:").replaceAll("替换", "替换:").replaceAll("序号", "序号:").replaceAll("排序", "排序:").replaceAll(str5, str4));
                            i++;
                            split = split;
                            str5 = str5;
                            str3 = str3;
                            length = length;
                            str4 = str4;
                            str2 = str2;
                        }
                    }
                }
            } catch (JSONException unused) {
            }
            X();
            this.f2 = e5("播放数组", "bfjiequshuzuqian", "list_arr_pre", "").isEmpty() || e5("播放标题", "bfbiaotiqian", "epi_title", "").isEmpty() || e5("数组", "jiequshuzuqian", "cat_arr_pre", "").isEmpty();
            this.sB = QQ("直接播放", "force_play", "0").equals("1");
            this.S = QQ("图片代理", "PicNeedProxy", "0").equals("1");
            this.A = Integer.parseInt(e5("热门推荐", "热门", "首页", "40"));
            this.y = QQ("调试", "debug", "0").equals("1");
            F = Hq("编码");
        }
    }

    public boolean isVideoFormat(String str) {
        String lowerCase = str.toLowerCase();
        String[] split = g5("嗅探词", g5("VideoFormat", ".m3u8#.mp4#.flv#.mp3#.m4a")).split("#");
        String[] split2 = g5("过滤词", g5("VideoFilter", "=http#.jpg#.png#.ico#.gif#.js")).split("#");
        for (String str2 : split) {
            if (lowerCase.contains(str2)) {
                for (String str3 : split2) {
                    if (lowerCase.contains(str3)) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }

    public boolean manualVideoCheck() {
        return !QQ("嗅探词", "过滤词", "").isEmpty() || g5("手动嗅探", "ManualSniffer").equals("1");
    }

    public String playerContent(String str, String str2, List<String> list) {
        String[] split;
        try {
            JSONObject jSONObject = new JSONObject();
            if (!str2.startsWith("http") && !str2.startsWith("magnet")) {
                str2 = Hq("主页url") + str2;
            }
            if (e5("免嗅", "mac", "Anal_MacPlayer", "0").equals("1") && !str2.startsWith("magnet")) {
                String str3 = null;
                k BN = hf.f2(wA.q4(str2, Ry(str2))).BN("script");
                int i = 0;
                while (true) {
                    if (i >= BN.size()) {
                        break;
                    }
                    String trim = ((bI) BN.get(i)).Kf().trim();
                    if (trim.startsWith("var player_")) {
                        JSONObject jSONObject2 = new JSONObject(trim.substring(trim.indexOf(123), trim.lastIndexOf(125) + 1));
                        str3 = jSONObject2.getString("url");
                        if (jSONObject2.has("encrypt")) {
                            int i2 = jSONObject2.getInt("encrypt");
                            if (i2 == 1) {
                                str3 = URLDecoder.decode(str3);
                            } else if (i2 == 2) {
                                str3 = URLDecoder.decode(new String(Base64.decode(str3, 0)));
                            }
                        }
                    } else {
                        i++;
                    }
                }
                if (isVideoFormat(str3)) {
                    jSONObject.put("parse", 0);
                } else if (if.S(str3)) {
                    jSONObject.put("parse", 1);
                    jSONObject.put("jx", "1");
                } else {
                    jSONObject.put("parse", 1);
                }
                str2 = str3;
            }
            jSONObject.put("playUrl", "");
            jSONObject.put("url", str2);
            String QQ = QQ("播放请求头", "play_header", "");
            if (QQ.contains("$")) {
                JSONObject jSONObject3 = new JSONObject();
                for (String str4 : QQ.split("#")) {
                    jSONObject3.put(str4.split("\\$")[0], str4.split("\\$")[1]);
                }
                jSONObject.put("header", jSONObject3.toString());
            }
            return jSONObject.toString();
        } catch (Exception e) {
            SpiderDebug.log(e);
            return "";
        }
    }

    protected String sB(String str) {
        String[] split;
        SpiderDebug.log(str);
        boolean startsWith = str.startsWith("xp");
        if (startsWith) {
            str = str.replaceAll("xp(http.*)", "$1");
        }
        xBPQ$1 r1 = new xBPQ$1(this);
        String NO = NO(str, str);
        String trim = NO.split(";post;")[1].trim();
        String str2 = NO.split(";")[0];
        if (trim.isEmpty()) {
            wA.sB(wA.e(), str2, (Map) null, Ry(str2), r1);
        } else if (!trim.startsWith("{") || !trim.endsWith("}")) {
            LinkedHashMap linkedHashMap = new LinkedHashMap();
            for (String str3 : trim.split("\\&")) {
                int indexOf = str3.indexOf("=");
                linkedHashMap.put(str3.substring(0, indexOf), str3.substring(indexOf + 1));
            }
            wA.sB(wA.e(), str2, linkedHashMap, Ry(str2), r1);
        } else {
            try {
                wA.y(wA.e(), str2, new JSONObject(trim).toString(), Ry(str2), r1);
            } catch (JSONException unused) {
            }
        }
        String Rq = Rq(AJ((String) r1.getResult()));
        return startsWith ? Rq : Rq.replace(" ", "空空空").replaceAll("\\s", "").replace("空空空", " ");
    }

    /* JADX WARN: Removed duplicated region for block: B:138:0x0411  */
    /* JADX WARN: Removed duplicated region for block: B:168:0x04e8 A[Catch: Exception -> 0x06ea, TryCatch #2 {Exception -> 0x06ea, blocks: (B:39:0x012c, B:41:0x0138, B:47:0x0168, B:48:0x0187, B:164:0x04c6, B:166:0x04de, B:168:0x04e8, B:171:0x04f3, B:173:0x04fd, B:177:0x0527, B:184:0x054b, B:186:0x056e, B:188:0x0579, B:190:0x057f, B:191:0x058d, B:193:0x0591, B:195:0x059b, B:196:0x05a0, B:197:0x05ab, B:198:0x05b4, B:200:0x05ba, B:202:0x05d2, B:205:0x05e8, B:207:0x0616, B:208:0x061a, B:210:0x0647, B:212:0x064e, B:214:0x065c, B:216:0x066c, B:218:0x0675, B:221:0x067c, B:222:0x068c, B:223:0x0691, B:224:0x069d, B:227:0x06a2, B:228:0x06d6, B:231:0x06ec), top: B:243:0x012c }] */
    /* JADX WARN: Removed duplicated region for block: B:180:0x052e  */
    /* JADX WARN: Removed duplicated region for block: B:181:0x0531  */
    /* JADX WARN: Removed duplicated region for block: B:184:0x054b A[Catch: Exception -> 0x06ea, TRY_ENTER, TryCatch #2 {Exception -> 0x06ea, blocks: (B:39:0x012c, B:41:0x0138, B:47:0x0168, B:48:0x0187, B:164:0x04c6, B:166:0x04de, B:168:0x04e8, B:171:0x04f3, B:173:0x04fd, B:177:0x0527, B:184:0x054b, B:186:0x056e, B:188:0x0579, B:190:0x057f, B:191:0x058d, B:193:0x0591, B:195:0x059b, B:196:0x05a0, B:197:0x05ab, B:198:0x05b4, B:200:0x05ba, B:202:0x05d2, B:205:0x05e8, B:207:0x0616, B:208:0x061a, B:210:0x0647, B:212:0x064e, B:214:0x065c, B:216:0x066c, B:218:0x0675, B:221:0x067c, B:222:0x068c, B:223:0x0691, B:224:0x069d, B:227:0x06a2, B:228:0x06d6, B:231:0x06ec), top: B:243:0x012c }] */
    /* JADX WARN: Removed duplicated region for block: B:200:0x05ba A[Catch: Exception -> 0x06ea, TryCatch #2 {Exception -> 0x06ea, blocks: (B:39:0x012c, B:41:0x0138, B:47:0x0168, B:48:0x0187, B:164:0x04c6, B:166:0x04de, B:168:0x04e8, B:171:0x04f3, B:173:0x04fd, B:177:0x0527, B:184:0x054b, B:186:0x056e, B:188:0x0579, B:190:0x057f, B:191:0x058d, B:193:0x0591, B:195:0x059b, B:196:0x05a0, B:197:0x05ab, B:198:0x05b4, B:200:0x05ba, B:202:0x05d2, B:205:0x05e8, B:207:0x0616, B:208:0x061a, B:210:0x0647, B:212:0x064e, B:214:0x065c, B:216:0x066c, B:218:0x0675, B:221:0x067c, B:222:0x068c, B:223:0x0691, B:224:0x069d, B:227:0x06a2, B:228:0x06d6, B:231:0x06ec), top: B:243:0x012c }] */
    /* JADX WARN: Removed duplicated region for block: B:20:0x0097 A[Catch: Exception -> 0x06f6, TRY_ENTER, TryCatch #4 {Exception -> 0x06f6, blocks: (B:11:0x004e, B:13:0x0058, B:15:0x0060, B:16:0x0079, B:17:0x008f, B:20:0x0097, B:21:0x00aa, B:25:0x00d9, B:27:0x00e9, B:29:0x00f4, B:31:0x00fa, B:32:0x0106, B:33:0x0109, B:35:0x0111, B:36:0x0116), top: B:247:0x004e }] */
    /* JADX WARN: Removed duplicated region for block: B:226:0x06a1  */
    /* JADX WARN: Removed duplicated region for block: B:241:0x03b7 A[EXC_TOP_SPLITTER, SYNTHETIC] */
    /* JADX WARN: Removed duplicated region for block: B:24:0x00d5  */
    /* JADX WARN: Removed duplicated region for block: B:253:0x018d A[EXC_TOP_SPLITTER, SYNTHETIC] */
    /* JADX WARN: Removed duplicated region for block: B:270:0x0527 A[ADDED_TO_REGION, EDGE_INSN: B:270:0x0527->B:177:0x0527 ?: BREAK  , SYNTHETIC] */
    /*
        Code decompiled incorrectly, please refer to instructions dump.
    */
    public String searchContent(String str, boolean z) {
        String str2;
        Exception e;
        boolean z2;
        String a;
        String str3;
        String str4;
        String str5;
        String str6;
        int i;
        String str7;
        JSONArray jSONArray;
        String str8;
        StringBuilder sb;
        String str9;
        String str10;
        String str11;
        ArrayList<String> Z;
        int i2;
        Throwable th;
        int i3;
        String str12;
        String trim;
        String str13;
        StringBuilder sb2;
        String str14;
        Exception e2;
        int i4;
        String str15 = str;
        String str16 = "搜索二次截取";
        String str17 = "不要";
        String str18 = "\\&[a-zA-Z]{1,10};";
        try {
            try {
                if (!QQ("搜索后缀", "sousuohouzhui", "").isEmpty()) {
                    if (!QQ("搜索模式", "ssmoshi", "").equals("1")) {
                        z2 = true;
                        String str19 = "sousuohouzhui";
                        str2 = "";
                        a = a("搜索url", "sousuoqian", "search_url", "searchUrl", "");
                        if (!a.isEmpty() || a.contains("{wd}")) {
                            str3 = a("搜索url", "sousuoqian", "search_url", "searchUrl", "").replaceAll("\\{wd\\}", str15);
                        } else {
                            str3 = a + str15 + Hq("sousuohou");
                        }
                        if (!str3.startsWith("http")) {
                            str3 = Hq("主页url") + str3;
                        }
                        JSONObject jSONObject = new JSONObject();
                        JSONArray jSONArray2 = new JSONArray();
                        String str20 = "$$$";
                        String str21 = "search_suffix";
                        String str22 = "ssljhouzhui";
                        String str23 = "搜索链接后缀";
                        String str24 = "搜索后缀";
                        String str25 = "search_prefix";
                        String str26 = "ssljqianzhui";
                        String str27 = "搜索链接前缀";
                        String str28 = ";";
                        String str29 = ";post";
                        if (z2) {
                            int i5 = 0;
                            int i6 = 1;
                            while (true) {
                                String replaceAll = str3.replaceAll("\\{pg\\}", String.valueOf(i6));
                                if (this.f2) {
                                    str6 = str26;
                                    this.f2 = false;
                                    str9 = str3.contains(str29) ? sB(replaceAll) : S(replaceAll.split(str28)[0]);
                                    this.f2 = true;
                                } else {
                                    str6 = str26;
                                    str9 = str3.contains(str29) ? sB(replaceAll) : S(replaceAll.split(str28)[0]);
                                }
                                str4 = str28;
                                str2 = str2;
                                try {
                                    if (!e5(str16, "ssjiequqian", "sea_twice_pre", str2).isEmpty()) {
                                        str16 = str16;
                                        str11 = str9;
                                        String str30 = Z(str11, e5(str16, "ssjiequqian", "sea_twice_pre", str2), QQ("ssjiequhou", "sea_twice_suf", str2)).get(0);
                                        if (!str30.isEmpty()) {
                                            str10 = str30;
                                            str5 = str29;
                                            Z = Z(str10, e5("搜索数组", "ssjiequshuzuqian", "sea_arr_pre", "<a&&/a>"), QQ("ssjiequshuzuhou", "sea_arr_suf", str2));
                                            i2 = 0;
                                            while (i2 < Z.size()) {
                                                try {
                                                    String str31 = Z.get(i2);
                                                    if (!str31.equals(str17) && !str31.isEmpty()) {
                                                        Z = Z;
                                                        i3 = i2;
                                                        try {
                                                            String trim2 = Z(str31, e5("搜索标题", "ssbiaotiqian", "sea_title", "title=\"&&\""), Hq("ssbiaotihou")).get(0).replaceAll(str18, str2).replaceAll("<[^>]*>", str2).replaceAll("[(/>)<]", str2).trim();
                                                            if (trim2.isEmpty()) {
                                                                trim2 = t(Z(str31, "alt=\"&&\"", str2).get(0)).replaceAll(str18, str2).replaceAll("<[^>]*>", str2).replaceAll("[(/>)<]", str2).trim();
                                                            }
                                                            if (trim2.isEmpty()) {
                                                                trim2 = t(Z(str31, "span>&&<", str2).get(0)).replaceAll(str18, str2).replaceAll("<[^>]*>", str2).replaceAll("[(/>)<]", str2).trim();
                                                            }
                                                            if (trim2.isEmpty()) {
                                                                trim2 = t(Z(str31, ">&&<", str2).get(0)).replaceAll(str18, str2).replaceAll("<[^>]*>", str2).replaceAll("[(/>)<]", str2).trim();
                                                            }
                                                            if (!trim2.equals(str17) && !trim2.isEmpty() && (!z || trim2.contains(str15))) {
                                                                String e5 = e5("搜索图片", "sstupianqian", "sea_pic", "data-original=\"&&\"");
                                                                if (!e5.startsWith("http://") && !e5.startsWith("https://")) {
                                                                    String str32 = Z(str31, e5, Hq("sstupianhou")).get(0);
                                                                    if (str32.isEmpty()) {
                                                                        str32 = Z(str31, "src=\"&&\"", str2).get(0);
                                                                    }
                                                                    if (!str32.equals(str17) && !str32.isEmpty()) {
                                                                        e5 = if.e(replaceAll, str32);
                                                                        if (this.S) {
                                                                            e5 = T(e5, replaceAll);
                                                                        }
                                                                    }
                                                                }
                                                                replaceAll = replaceAll;
                                                                String trim3 = Z(str31, e5("搜索链接", "sslianjieqian", "sea_url", "href=\"&&\""), Hq("sslianjiehou")).get(0).trim();
                                                                if (trim3.length() < 6 || (this.f2 && trim3.startsWith("http") && !trim3.contains(Hq("主页url")))) {
                                                                    str18 = str18;
                                                                    jSONArray2 = jSONArray2;
                                                                    str20 = str20;
                                                                    str23 = str23;
                                                                    str22 = str22;
                                                                    str27 = str27;
                                                                    str25 = str25;
                                                                    str17 = str17;
                                                                    str21 = str21;
                                                                    str6 = str6;
                                                                    i2 = i3 + 1;
                                                                    str15 = str;
                                                                } else {
                                                                    try {
                                                                        if (e5(str27, str6, str25, str2).length() > 0) {
                                                                            try {
                                                                                str12 = str11;
                                                                                ArrayList<String> Z2 = Z(str12, e5(str27, str6, str25, str2), str2);
                                                                                str17 = str17;
                                                                                try {
                                                                                    trim = Z2.get(0).trim();
                                                                                } catch (Throwable th2) {
                                                                                    th = th2;
                                                                                    str18 = str18;
                                                                                    jSONArray2 = jSONArray2;
                                                                                    str20 = str20;
                                                                                    str21 = str21;
                                                                                    str22 = str22;
                                                                                    str6 = str6;
                                                                                    str25 = str25;
                                                                                    str23 = str23;
                                                                                    str27 = str27;
                                                                                    th.printStackTrace();
                                                                                    if (!str3.contains("{pg}")) {
                                                                                    }
                                                                                    if (jSONArray2.length() < 1) {
                                                                                    }
                                                                                    if (z2) {
                                                                                    }
                                                                                    jSONObject.put("list", jSONArray2);
                                                                                    return jSONObject.toString();
                                                                                }
                                                                            } catch (Throwable th3) {
                                                                                th = th3;
                                                                                str17 = str17;
                                                                            }
                                                                        } else {
                                                                            str17 = str17;
                                                                            str12 = str11;
                                                                            trim = str2;
                                                                        }
                                                                        str21 = str21;
                                                                        str6 = str6;
                                                                        str23 = str23;
                                                                        str27 = str27;
                                                                        try {
                                                                            if (e5(str23, str22, str21, str2).length() > 0) {
                                                                                str25 = str25;
                                                                                try {
                                                                                    str11 = str12;
                                                                                    str13 = Z(str12, e5(str23, str22, str21, str2), str2).get(0).trim();
                                                                                } catch (Throwable th4) {
                                                                                    th = th4;
                                                                                    str18 = str18;
                                                                                    str22 = str22;
                                                                                    jSONArray2 = jSONArray2;
                                                                                    str20 = str20;
                                                                                    th.printStackTrace();
                                                                                    if (!str3.contains("{pg}")) {
                                                                                    }
                                                                                    if (jSONArray2.length() < 1) {
                                                                                    }
                                                                                    if (z2) {
                                                                                    }
                                                                                    jSONObject.put("list", jSONArray2);
                                                                                    return jSONObject.toString();
                                                                                }
                                                                            } else {
                                                                                str11 = str12;
                                                                                str25 = str25;
                                                                                str13 = str2;
                                                                            }
                                                                            str22 = str22;
                                                                            try {
                                                                                try {
                                                                                    if (trim.length() >= 1) {
                                                                                        try {
                                                                                            if (!trim3.startsWith("http")) {
                                                                                                sb2 = new StringBuilder();
                                                                                                sb2.append(trim);
                                                                                                sb2.append(trim3);
                                                                                                sb2.append(str13);
                                                                                                String sb3 = sb2.toString();
                                                                                                if (e5("搜索副标题", "ssfubiaotiqian", "sea_subtitle", str2).isEmpty()) {
                                                                                                    try {
                                                                                                        str14 = Z(str31, e5("搜索副标题", "ssfubiaotiqian", "sea_subtitle", str2), Hq("ssfubiaotihou")).get(0).replaceAll(str18, str2).replaceAll("^ *(.*)", "$1").replaceAll("更新", "更").replaceAll("<[^>]*>", " ").replaceAll("[(/>)<]", str2).replaceAll(" +", " ");
                                                                                                    } catch (Exception e3) {
                                                                                                        e2 = e3;
                                                                                                        str14 = str2;
                                                                                                    }
                                                                                                    try {
                                                                                                        if (str14.length() > 16) {
                                                                                                            str14 = str14.substring(0, 16);
                                                                                                        }
                                                                                                    } catch (Exception e4) {
                                                                                                        e2 = e4;
                                                                                                        SpiderDebug.log(e2);
                                                                                                        JSONObject jSONObject2 = new JSONObject();
                                                                                                        StringBuilder sb4 = new StringBuilder();
                                                                                                        sb4.append(trim2);
                                                                                                        str18 = str18;
                                                                                                        str20 = str20;
                                                                                                        sb4.append(str20);
                                                                                                        sb4.append(e5);
                                                                                                        sb4.append(str20);
                                                                                                        sb4.append(sb3);
                                                                                                        jSONObject2.put("vod_id", sb4.toString());
                                                                                                        jSONObject2.put("vod_name", trim2);
                                                                                                        jSONObject2.put("vod_pic", e5);
                                                                                                        jSONObject2.put("vod_remarks", str14);
                                                                                                        jSONArray2 = jSONArray2;
                                                                                                        jSONArray2.put(jSONObject2);
                                                                                                        i2 = i3 + 1;
                                                                                                        str15 = str;
                                                                                                    }
                                                                                                } else {
                                                                                                    str14 = str2;
                                                                                                }
                                                                                                JSONObject jSONObject22 = new JSONObject();
                                                                                                StringBuilder sb42 = new StringBuilder();
                                                                                                sb42.append(trim2);
                                                                                                str18 = str18;
                                                                                                str20 = str20;
                                                                                                sb42.append(str20);
                                                                                                sb42.append(e5);
                                                                                                sb42.append(str20);
                                                                                                sb42.append(sb3);
                                                                                                jSONObject22.put("vod_id", sb42.toString());
                                                                                                jSONObject22.put("vod_name", trim2);
                                                                                                jSONObject22.put("vod_pic", e5);
                                                                                                jSONObject22.put("vod_remarks", str14);
                                                                                                jSONArray2 = jSONArray2;
                                                                                                jSONArray2.put(jSONObject22);
                                                                                                i2 = i3 + 1;
                                                                                                str15 = str;
                                                                                            }
                                                                                        } catch (Throwable th5) {
                                                                                            th = th5;
                                                                                            str18 = str18;
                                                                                            jSONArray2 = jSONArray2;
                                                                                            str20 = str20;
                                                                                            th.printStackTrace();
                                                                                            if (!str3.contains("{pg}")) {
                                                                                            }
                                                                                            if (jSONArray2.length() < 1) {
                                                                                            }
                                                                                            if (z2) {
                                                                                            }
                                                                                            jSONObject.put("list", jSONArray2);
                                                                                            return jSONObject.toString();
                                                                                        }
                                                                                    }
                                                                                    jSONArray2.put(jSONObject22);
                                                                                    i2 = i3 + 1;
                                                                                    str15 = str;
                                                                                } catch (Throwable th6) {
                                                                                    th = th6;
                                                                                    th.printStackTrace();
                                                                                    if (!str3.contains("{pg}")) {
                                                                                    }
                                                                                    if (jSONArray2.length() < 1) {
                                                                                    }
                                                                                    if (z2) {
                                                                                    }
                                                                                    jSONObject.put("list", jSONArray2);
                                                                                    return jSONObject.toString();
                                                                                }
                                                                                sb42.append(str20);
                                                                                sb42.append(e5);
                                                                                sb42.append(str20);
                                                                                sb42.append(sb3);
                                                                                jSONObject22.put("vod_id", sb42.toString());
                                                                                jSONObject22.put("vod_name", trim2);
                                                                                jSONObject22.put("vod_pic", e5);
                                                                                jSONObject22.put("vod_remarks", str14);
                                                                                jSONArray2 = jSONArray2;
                                                                            } catch (Throwable th7) {
                                                                                th = th7;
                                                                                jSONArray2 = jSONArray2;
                                                                            }
                                                                            sb2 = new StringBuilder();
                                                                            sb2.append(trim3);
                                                                            sb2.append(str13);
                                                                            String sb32 = sb2.toString();
                                                                            if (e5("搜索副标题", "ssfubiaotiqian", "sea_subtitle", str2).isEmpty()) {
                                                                            }
                                                                            JSONObject jSONObject222 = new JSONObject();
                                                                            StringBuilder sb422 = new StringBuilder();
                                                                            sb422.append(trim2);
                                                                            str18 = str18;
                                                                            str20 = str20;
                                                                        } catch (Throwable th8) {
                                                                            th = th8;
                                                                            str18 = str18;
                                                                            str22 = str22;
                                                                            str25 = str25;
                                                                        }
                                                                    } catch (Throwable th9) {
                                                                        th = th9;
                                                                        str18 = str18;
                                                                        str17 = str17;
                                                                    }
                                                                }
                                                            }
                                                            str18 = str18;
                                                            replaceAll = replaceAll;
                                                            jSONArray2 = jSONArray2;
                                                            str20 = str20;
                                                            str23 = str23;
                                                            str22 = str22;
                                                            str27 = str27;
                                                            str25 = str25;
                                                            str17 = str17;
                                                            str21 = str21;
                                                            str6 = str6;
                                                            i2 = i3 + 1;
                                                            str15 = str;
                                                        } catch (Throwable th10) {
                                                            th = th10;
                                                            str18 = str18;
                                                            jSONArray2 = jSONArray2;
                                                            str20 = str20;
                                                            str23 = str23;
                                                            str22 = str22;
                                                            str27 = str27;
                                                            str25 = str25;
                                                            str17 = str17;
                                                            str21 = str21;
                                                            str6 = str6;
                                                            th.printStackTrace();
                                                            if (!str3.contains("{pg}")) {
                                                            }
                                                            if (jSONArray2.length() < 1) {
                                                            }
                                                            if (z2) {
                                                            }
                                                            jSONObject.put("list", jSONArray2);
                                                            return jSONObject.toString();
                                                        }
                                                    }
                                                    Z = Z;
                                                    i3 = i2;
                                                    replaceAll = replaceAll;
                                                    jSONArray2 = jSONArray2;
                                                    str20 = str20;
                                                    str23 = str23;
                                                    str22 = str22;
                                                    str27 = str27;
                                                    str25 = str25;
                                                    str17 = str17;
                                                    str21 = str21;
                                                    str6 = str6;
                                                    i2 = i3 + 1;
                                                    str15 = str;
                                                } catch (Throwable th11) {
                                                    th = th11;
                                                }
                                            }
                                            jSONArray2 = jSONArray2;
                                            str20 = str20;
                                            str23 = str23;
                                            str22 = str22;
                                            str27 = str27;
                                            str25 = str25;
                                            str17 = str17;
                                            str21 = str21;
                                            str6 = str6;
                                            if (!str3.contains("{pg}") || i5 == jSONArray2.length() - 1) {
                                                break;
                                            }
                                            i5 = jSONArray2.length();
                                            i4 = i6 + 1;
                                            if (i4 < 10 || !str3.contains("{pg}")) {
                                                break;
                                            }
                                            i6 = i4;
                                            jSONArray2 = jSONArray2;
                                            str20 = str20;
                                            str3 = str3;
                                            str27 = str27;
                                            str26 = str6;
                                            str25 = str25;
                                            str29 = str5;
                                            str22 = str22;
                                            str2 = str2;
                                            str23 = str23;
                                            str21 = str21;
                                            str28 = str4;
                                            str15 = str;
                                        }
                                    } else {
                                        str16 = str16;
                                        str11 = str9;
                                    }
                                    str10 = str11;
                                    str5 = str29;
                                    Z = Z(str10, e5("搜索数组", "ssjiequshuzuqian", "sea_arr_pre", "<a&&/a>"), QQ("ssjiequshuzuhou", "sea_arr_suf", str2));
                                    i2 = 0;
                                    while (i2 < Z.size()) {
                                    }
                                    jSONArray2 = jSONArray2;
                                    str20 = str20;
                                    str23 = str23;
                                    str22 = str22;
                                    str27 = str27;
                                    str25 = str25;
                                    str17 = str17;
                                    str21 = str21;
                                    str6 = str6;
                                    if (!str3.contains("{pg}")) {
                                        break;
                                        break;
                                    }
                                    i5 = jSONArray2.length();
                                    i4 = i6 + 1;
                                    if (i4 < 10) {
                                        break;
                                        break;
                                    }
                                    i6 = i4;
                                    jSONArray2 = jSONArray2;
                                    str20 = str20;
                                    str3 = str3;
                                    str27 = str27;
                                    str26 = str6;
                                    str25 = str25;
                                    str29 = str5;
                                    str22 = str22;
                                    str2 = str2;
                                    str23 = str23;
                                    str21 = str21;
                                    str28 = str4;
                                    str15 = str;
                                } catch (Exception e6) {
                                    e = e6;
                                    SpiderDebug.log(e);
                                    return str2;
                                }
                            }
                            if (jSONArray2.length() < 1) {
                                z2 = true;
                            }
                        } else {
                            str4 = str28;
                            str5 = str29;
                            str22 = str22;
                            str25 = str25;
                            str2 = str2;
                            jSONArray2 = jSONArray2;
                            str23 = str23;
                            str21 = str21;
                            str6 = str26;
                            str27 = str27;
                            str20 = str20;
                        }
                        if (z2) {
                            StringBuilder sb5 = new StringBuilder();
                            sb5.append(Hq("主页url"));
                            sb5.append("/index.php/ajax/suggest?mid=1&wd=");
                            String str33 = str;
                            sb5.append(str33);
                            sb5.append("&limit=500");
                            String sb6 = sb5.toString();
                            if (this.f2) {
                                this.f2 = false;
                                str7 = sb6.contains(str5) ? sB(sb6) : S(sb6.split(str4)[0]);
                                this.f2 = true;
                            } else if (sb6.contains(str5)) {
                                str7 = sB(sb6);
                            } else {
                                i = 0;
                                str7 = S(sb6.split(str4)[0]);
                                jSONArray = new JSONObject(str7).getJSONArray("list");
                                while (i < jSONArray.length()) {
                                    JSONObject jSONObject3 = jSONArray.getJSONObject(i);
                                    String trim4 = jSONObject3.optString(QQ("jsname", "jsonname", "name")).trim();
                                    if (!z || trim4.contains(str33)) {
                                        String trim5 = jSONObject3.optString(QQ("jsid", "jsonid", "id")).trim();
                                        jSONArray = jSONArray;
                                        String e7 = if.e(sb6, jSONObject3.optString(QQ("jspic", "jsonpic", "pic")).trim());
                                        if (this.S) {
                                            e7 = T(e7, sb6);
                                        }
                                        StringBuilder sb7 = new StringBuilder();
                                        sb6 = sb6;
                                        str24 = str24;
                                        sb7.append(QQ(str24, str19, "/voddetail/"));
                                        sb7.append(trim5);
                                        String sb8 = sb7.toString();
                                        str19 = str19;
                                        str6 = str6;
                                        String e52 = e5(str27, str6, str25, str2).length() > 0 ? e5(str27, str6, str25, str2) : str2;
                                        str27 = str27;
                                        if (e5(str23, str22, str21, str2).length() > 0) {
                                            str8 = e5(str23, str22, str21, str2);
                                            str22 = str22;
                                            str23 = str23;
                                        } else {
                                            str22 = str22;
                                            str23 = str23;
                                            str8 = str2;
                                        }
                                        str25 = str25;
                                        if (e52.length() >= 1 && !sb8.startsWith("http")) {
                                            sb = new StringBuilder();
                                            sb.append(e52);
                                            sb.append(sb8);
                                            sb.append(str8);
                                            String sb9 = sb.toString();
                                            if (this.y) {
                                                trim4 = sb9;
                                            }
                                            JSONObject jSONObject4 = new JSONObject();
                                            jSONObject4.put("vod_id", trim4 + str20 + e7 + str20 + sb9);
                                            jSONObject4.put("vod_name", trim4);
                                            jSONObject4.put("vod_pic", e7);
                                            jSONObject4.put("vod_remarks", str2);
                                            jSONArray2.put(jSONObject4);
                                        }
                                        sb = new StringBuilder();
                                        sb.append(sb8);
                                        sb.append(str8);
                                        String sb92 = sb.toString();
                                        if (this.y) {
                                        }
                                        JSONObject jSONObject42 = new JSONObject();
                                        jSONObject42.put("vod_id", trim4 + str20 + e7 + str20 + sb92);
                                        jSONObject42.put("vod_name", trim4);
                                        jSONObject42.put("vod_pic", e7);
                                        jSONObject42.put("vod_remarks", str2);
                                        jSONArray2.put(jSONObject42);
                                    } else {
                                        sb6 = sb6;
                                        jSONArray = jSONArray;
                                        str23 = str23;
                                        str24 = str24;
                                        str6 = str6;
                                        str25 = str25;
                                        str22 = str22;
                                    }
                                    i++;
                                    str33 = str;
                                }
                            }
                            i = 0;
                            jSONArray = new JSONObject(str7).getJSONArray("list");
                            while (i < jSONArray.length()) {
                            }
                        }
                        jSONObject.put("list", jSONArray2);
                        return jSONObject.toString();
                    }
                }
                a = a("搜索url", "sousuoqian", "search_url", "searchUrl", "");
                if (!a.isEmpty()) {
                }
                str3 = a("搜索url", "sousuoqian", "search_url", "searchUrl", "").replaceAll("\\{wd\\}", str15);
                if (!str3.startsWith("http")) {
                }
                JSONObject jSONObject5 = new JSONObject();
                JSONArray jSONArray22 = new JSONArray();
                String str202 = "$$$";
                String str212 = "search_suffix";
                String str222 = "ssljhouzhui";
                String str232 = "搜索链接后缀";
                String str242 = "搜索后缀";
                String str252 = "search_prefix";
                String str262 = "ssljqianzhui";
                String str272 = "搜索链接前缀";
                String str282 = ";";
                String str292 = ";post";
                if (z2) {
                }
                if (z2) {
                }
                jSONObject5.put("list", jSONArray22);
                return jSONObject5.toString();
            } catch (Exception e8) {
                e = e8;
            }
            z2 = false;
            String str192 = "sousuohouzhui";
            str2 = "";
        } catch (Exception e9) {
            e = e9;
            str2 = "";
        }
    }

    String t(String str) {
        return hf.f2(str).D();
    }
}
