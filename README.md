# preetycode
`preetycode` is a software to preety print code into a `pdf` file.

```
Usage: preetycode [-h] [-v] [-e | extension (default .py)] [-a | version]
              [-o |output folder (default "preety")] file
Converts code into a preety formated pdf

Arguments:
  -h, --help        Show this help
  -b, --verbose     Explain whats being done
  -e, --extension   Changes the file extension for the target files
  -a, --add-version Adds the version number to the header
  -o, --output      Changes the output folder
  -V, --version     Shows the software version
```

## Dependencies

* [pandoc](http://pandoc.org/)    - markdown to pdf converter
* [texlive](https://www.tug.org/texlive/)   - TeX typesetting system

## License
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
