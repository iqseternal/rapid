# 获取提交中更改的文件列表
changed_files=$(git diff --cached --name-only)

# 筛选出 TypeScript 文件
ts_files=$(echo "$changed_files" | grep '\.tsx\?$')

# 如果有 TypeScript 文件，则运行类型检查
if [ -n "$ts_files" ]; then
    echo "Running type checking on modified TypeScript files..."
    pnpx tsc --noEmit $ts_files
    if [ $? -eq 0 ]; then
        echo "Type checking passed."
    else
        echo "Type checking failed. Please fix the errors before committing."
        exit 1
    fi
fi
