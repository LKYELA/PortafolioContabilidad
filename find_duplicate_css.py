#!/usr/bin/env python3
import re
import sys
from collections import defaultdict

def normalize_selector(selector):
    # Split by comma, strip, sort, and join
    parts = [part.strip() for part in selector.split(',')]
    parts.sort()
    return ', '.join(parts)

def normalize_declarations(decls):
    # Split by semicolon, each part is property: value
    decls_list = []
    for decl in decls.split(';'):
        decl = decl.strip()
        if not decl:
            continue
        if ':' not in decl:
            continue
        prop, val = decl.split(':', 1)
        prop = prop.strip()
        val = val.strip()
        decls_list.append((prop, val))
    # Sort by property then value
    decls_list.sort(key=lambda x: (x[0], x[1]))
    return decls_list

def parse_css_block(css_block):
    # Remove comments
    css_block = re.sub(r'/\*.*?\*/', '', css_block, flags=re.DOTALL)
    # Split into rules by '}'
    rules = []
    for chunk in css_block.split('}'):
        chunk = chunk.strip()
        if not chunk:
            continue
        if '{' not in chunk:
            continue
        # Split into selector and declarations by the first '{'
        selector, declarations = chunk.split('{', 1)
        selector = selector.strip()
        declarations = declarations.strip()
        rules.append((selector, declarations))
    return rules

def main():
    filename = sys.argv[1] if len(sys.argv) > 1 else 'style.css'
    with open(filename, 'r') as f:
        css_content = f.read()

    # Split by media queries to handle each block separately
    # We'll split by '@media' but keep the delimiter
    blocks = []
    current = []
    lines = css_content.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i]
        if line.strip().startswith('@media'):
            if current:
                blocks.append('\n'.join(current))
                current = []
            # Start a new block with this media query line
            current.append(line)
            i += 1
            # Continue until we find a line that is not part of the media query? 
            # Actually, we want to include until the next '@media' or end of file.
            # We'll just add lines until we hit another '@media' at the start of a line (ignoring whitespace)
            while i < len(lines) and not (lines[i].strip().startswith('@media') and i != 0):
                current.append(lines[i])
                i += 1
            # Now we have a block that ends before the next '@media' or at end
            blocks.append('\n'.join(current))
            current = []
            # Note: we have already incremented i in the inner loop, so we don't increment again
            continue
        else:
            current.append(line)
            i += 1
    if current:
        blocks.append('\n'.join(current))

    # Now parse each block
    all_duplicates = defaultdict(list)
    for block_idx, block in enumerate(blocks):
        rules = parse_css_block(block)
        # Normalize each rule
        normalized_rules = []
        for selector, declarations in rules:
            norm_sel = normalize_selector(selector)
            norm_decls = normalize_declarations(declarations)
            normalized_rules.append((norm_sel, norm_decls))
        # Count occurrences
        count = defaultdict(int)
        for norm_sel, norm_decls in normalized_rules:
            key = (norm_sel, tuple(norm_decls))
            count[key] += 1
        # Find duplicates (count > 1)
        for key, cnt in count.items():
            if cnt > 1:
                norm_sel, norm_decls_tuple = key
                all_duplicates[(norm_sel, norm_decls_tuple)].append((block_idx, cnt))

    # Output duplicates
    if not all_duplicates:
        print("No duplicate CSS rules found.")
        return

    print("Duplicate CSS rules found:")
    for (norm_sel, norm_decls_tuple), occurrences in all_duplicates.items():
        print(f"\nSelector: {norm_sel}")
        print("Declarations:")
        for prop, val in norm_decls_tuple:
            print(f"  {prop}: {val};")
        print(f"Found in {len(occurrences)} block(s) with counts: {occurrences}")

if __name__ == '__main__':
    main()