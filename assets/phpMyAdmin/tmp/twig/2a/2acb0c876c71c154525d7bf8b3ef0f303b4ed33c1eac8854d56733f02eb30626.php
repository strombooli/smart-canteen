<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* table/chart/tbl_chart.twig */
class __TwigTemplate_624242c1f0d3b54ce9bfc102674268e13b61b5eff260462e0073d270f59be17c extends \Twig\Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 2
        echo "<div id=\"div_view_options\">
    <form method=\"post\" id=\"tblchartform\" action=\"";
        // line 3
        echo PhpMyAdmin\Url::getFromRoute("/table/chart");
        echo "\" class=\"ajax\">
        ";
        // line 4
        echo PhpMyAdmin\Url::getHiddenInputs(($context["url_params"] ?? null));
        echo "
        <fieldset>
            <legend>
                ";
        // line 7
        echo _gettext("Display chart");
        // line 8
        echo "            </legend>
            <div class=\"chartOption\">
                <div class=\"formelement\">
                    <input type=\"radio\" name=\"chartType\" value=\"bar\" id=\"radio_bar\">
                    <label for =\"radio_bar\">";
        // line 12
        echo _pgettext(        "Chart type", "Bar");
        echo "</label>
                </div>
                <div class=\"formelement\">
                    <input type=\"radio\" name=\"chartType\" value=\"column\" id=\"radio_column\">
                    <label for =\"radio_column\">";
        // line 16
        echo _pgettext(        "Chart type", "Column");
        echo "</label>
                </div>
                <div class=\"formelement\">
                    <input type=\"radio\" name=\"chartType\" value=\"line\" id=\"radio_line\" checked=\"checked\">
                    <label for =\"radio_line\">";
        // line 20
        echo _pgettext(        "Chart type", "Line");
        echo "</label>
                </div>
                <div class=\"formelement\">
                    <input type=\"radio\" name=\"chartType\" value=\"spline\" id=\"radio_spline\">
                    <label for =\"radio_spline\">";
        // line 24
        echo _pgettext(        "Chart type", "Spline");
        echo "</label>
                </div>
                <div class=\"formelement\">
                    <input type=\"radio\" name=\"chartType\" value=\"area\" id=\"radio_area\">
                    <label for =\"radio_area\">";
        // line 28
        echo _pgettext(        "Chart type", "Area");
        echo "</label>
                </div>
                <span class=\"span_pie hide\">
                    <input type=\"radio\" name=\"chartType\" value=\"pie\" id=\"radio_pie\">
                    <label for =\"radio_pie\">";
        // line 32
        echo _pgettext(        "Chart type", "Pie");
        echo "</label>
                </span>
                <span class=\"span_timeline hide\">
                    <input type=\"radio\" name=\"chartType\" value=\"timeline\" id=\"radio_timeline\">
                    <label for =\"radio_timeline\">";
        // line 36
        echo _pgettext(        "Chart type", "Timeline");
        echo "</label>
                </span>
                <span class=\"span_scatter hide\">
                <input type=\"radio\" name=\"chartType\" value=\"scatter\" id=\"radio_scatter\">
                <label for =\"radio_scatter\">";
        // line 40
        echo _pgettext(        "Chart type", "Scatter");
        echo "</label>
                </span>
                <br><br>
                <span class=\"barStacked hide\">
                    <input type=\"checkbox\" name=\"barStacked\" value=\"1\" id=\"checkbox_barStacked\">
                    <label for =\"checkbox_barStacked\">";
        // line 45
        echo _gettext("Stacked");
        echo "</label>
                </span>
                <br><br>
                <label for =\"chartTitle\">";
        // line 48
        echo _gettext("Chart title:");
        echo "</label>
                <input type=\"text\" name=\"chartTitle\" id=\"chartTitle\">
            </div>
            ";
        // line 51
        $context["xaxis"] = null;
        // line 52
        echo "            <div class=\"chartOption\">
                <label for=\"select_chartXAxis\">";
        // line 53
        echo _gettext("X-Axis:");
        echo "</label>
                <select name=\"chartXAxis\" id=\"select_chartXAxis\">
                    ";
        // line 55
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["keys"] ?? null));
        foreach ($context['_seq'] as $context["idx"] => $context["key"]) {
            // line 56
            echo "                        ";
            if ((($context["xaxis"] ?? null) === null)) {
                // line 57
                echo "                            ";
                $context["xaxis"] = $context["idx"];
                // line 58
                echo "                        ";
            }
            // line 59
            echo "                        ";
            if ((($context["xaxis"] ?? null) === $context["idx"])) {
                // line 60
                echo "                            <option value=\"";
                echo twig_escape_filter($this->env, $context["idx"], "html", null, true);
                echo "\" selected=\"selected\">";
                echo twig_escape_filter($this->env, $context["key"], "html", null, true);
                echo "</option>
                        ";
            } else {
                // line 62
                echo "                            <option value=\"";
                echo twig_escape_filter($this->env, $context["idx"], "html", null, true);
                echo "\">";
                echo twig_escape_filter($this->env, $context["key"], "html", null, true);
                echo "</option>
                        ";
            }
            // line 64
            echo "                    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['idx'], $context['key'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 65
        echo "                </select>
                <br>
                <label for=\"select_chartSeries\">
                    ";
        // line 68
        echo _gettext("Series:");
        // line 69
        echo "                </label>
                <select name=\"chartSeries\" id=\"select_chartSeries\" multiple=\"multiple\">
                    ";
        // line 71
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["keys"] ?? null));
        foreach ($context['_seq'] as $context["idx"] => $context["key"]) {
            // line 72
            echo "                        ";
            if (twig_in_filter(twig_get_attribute($this->env, $this->source, (($__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4 = ($context["fields_meta"] ?? null)) && is_array($__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4) || $__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4 instanceof ArrayAccess ? ($__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4[$context["idx"]] ?? null) : null), "type", [], "any", false, false, false, 72), ($context["numeric_types"] ?? null))) {
                // line 73
                echo "                            ";
                if ((($context["idx"] == ($context["xaxis"] ?? null)) && (($context["numeric_column_count"] ?? null) > 1))) {
                    // line 74
                    echo "                                <option value=\"";
                    echo twig_escape_filter($this->env, $context["idx"], "html", null, true);
                    echo "\">";
                    echo twig_escape_filter($this->env, $context["key"], "html", null, true);
                    echo "</option>
                            ";
                } else {
                    // line 76
                    echo "                                <option value=\"";
                    echo twig_escape_filter($this->env, $context["idx"], "html", null, true);
                    echo "\" selected=\"selected\">";
                    echo twig_escape_filter($this->env, $context["key"], "html", null, true);
                    echo "</option>
                            ";
                }
                // line 78
                echo "                        ";
            }
            // line 79
            echo "                    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['idx'], $context['key'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 80
        echo "                </select>
                <input type=\"hidden\" name=\"dateTimeCols\" value=\"
                    ";
        // line 82
        $context["date_time_types"] = [0 => "date", 1 => "datetime", 2 => "timestamp"];
        // line 83
        echo "                    ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["keys"] ?? null));
        foreach ($context['_seq'] as $context["idx"] => $context["key"]) {
            // line 84
            echo "                        ";
            if (twig_in_filter(twig_get_attribute($this->env, $this->source, (($__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144 = ($context["fields_meta"] ?? null)) && is_array($__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144) || $__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144 instanceof ArrayAccess ? ($__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144[$context["idx"]] ?? null) : null), "type", [], "any", false, false, false, 84), ($context["date_time_types"] ?? null))) {
                // line 85
                echo "                            ";
                echo twig_escape_filter($this->env, ($context["idx"] . " "), "html", null, true);
                echo "
                        ";
            }
            // line 87
            echo "                    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['idx'], $context['key'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        echo "\">
                <input type=\"hidden\" name=\"numericCols\" value=\"
                    ";
        // line 89
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["keys"] ?? null));
        foreach ($context['_seq'] as $context["idx"] => $context["key"]) {
            // line 90
            echo "                        ";
            if (twig_in_filter(twig_get_attribute($this->env, $this->source, (($__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b = ($context["fields_meta"] ?? null)) && is_array($__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b) || $__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b instanceof ArrayAccess ? ($__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b[$context["idx"]] ?? null) : null), "type", [], "any", false, false, false, 90), ($context["numeric_types"] ?? null))) {
                // line 91
                echo "                            ";
                echo twig_escape_filter($this->env, ($context["idx"] . " "), "html", null, true);
                echo "
                        ";
            }
            // line 93
            echo "                    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['idx'], $context['key'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        echo "\">
            </div>
            <div class=\"chartOption\">
                <label for=\"xaxis_panel\">
                    ";
        // line 97
        echo _gettext("X-Axis label:");
        // line 98
        echo "                </label>
                <input style=\"margin-top:0;\" type=\"text\" name=\"xaxis_label\" id=\"xaxis_label\" value=\"";
        // line 99
        echo twig_escape_filter($this->env, (((($context["xaxis"] ?? null) ==  -1)) ? (_gettext("X Values")) : ((($__internal_68aa442c1d43d3410ea8f958ba9090f3eaa9a76f8de8fc9be4d6c7389ba28002 = ($context["keys"] ?? null)) && is_array($__internal_68aa442c1d43d3410ea8f958ba9090f3eaa9a76f8de8fc9be4d6c7389ba28002) || $__internal_68aa442c1d43d3410ea8f958ba9090f3eaa9a76f8de8fc9be4d6c7389ba28002 instanceof ArrayAccess ? ($__internal_68aa442c1d43d3410ea8f958ba9090f3eaa9a76f8de8fc9be4d6c7389ba28002[($context["xaxis"] ?? null)] ?? null) : null))), "html", null, true);
        echo "\">
                <br>
                <label for=\"yaxis_label\">
                    ";
        // line 102
        echo _gettext("Y-Axis label:");
        // line 103
        echo "                </label>
                <input type=\"text\" name=\"yaxis_label\" id=\"yaxis_label\" value=\"";
        // line 104
        echo _gettext("Y Values");
        echo "\">
                <br>
            </div>
            <div class=\"clearfloat\"></div>
            <div>
                <input type=\"checkbox\" id=\"chkAlternative\" name=\"chkAlternative\" value=\"alternativeFormat\">
                <label for=\"chkAlternative\">";
        // line 110
        echo _gettext("Series names are in a column");
        echo "</label>
                <br>
                <label for=\"select_seriesColumn\">
                    ";
        // line 113
        echo _gettext("Series column:");
        // line 114
        echo "                </label>
                <select name=\"chartSeriesColumn\" id=\"select_seriesColumn\" disabled>
                    ";
        // line 116
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["keys"] ?? null));
        foreach ($context['_seq'] as $context["idx"] => $context["key"]) {
            // line 117
            echo "                        <option value=\"";
            echo twig_escape_filter($this->env, $context["idx"], "html", null, true);
            echo "\"
                            ";
            // line 118
            if (($context["idx"] == 1)) {
                // line 119
                echo "                                selected=\"selected\"
                            ";
            }
            // line 120
            echo ">
                                ";
            // line 121
            echo twig_escape_filter($this->env, $context["key"], "html", null, true);
            echo "
                        </option>
                        ";
            // line 123
            $context["series_column"] = $context["idx"];
            // line 124
            echo "                    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['idx'], $context['key'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 125
        echo "                </select>
                <label for=\"select_valueColumn\">
                    ";
        // line 127
        echo _gettext("Value Column:");
        // line 128
        echo "                </label>
                <select name=\"chartValueColumn\" id=\"select_valueColumn\" disabled>
                    ";
        // line 130
        $context["selected"] = false;
        // line 131
        echo "                    ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["keys"] ?? null));
        foreach ($context['_seq'] as $context["idx"] => $context["key"]) {
            // line 132
            echo "                        ";
            if (twig_in_filter(twig_get_attribute($this->env, $this->source, (($__internal_d7fc55f1a54b629533d60b43063289db62e68921ee7a5f8de562bd9d4a2b7ad4 = ($context["fields_meta"] ?? null)) && is_array($__internal_d7fc55f1a54b629533d60b43063289db62e68921ee7a5f8de562bd9d4a2b7ad4) || $__internal_d7fc55f1a54b629533d60b43063289db62e68921ee7a5f8de562bd9d4a2b7ad4 instanceof ArrayAccess ? ($__internal_d7fc55f1a54b629533d60b43063289db62e68921ee7a5f8de562bd9d4a2b7ad4[$context["idx"]] ?? null) : null), "type", [], "any", false, false, false, 132), ($context["numeric_types"] ?? null))) {
                // line 133
                echo "                            ";
                if ((( !($context["selected"] ?? null) && ($context["idx"] != ($context["xaxis"] ?? null))) && ($context["idx"] != ($context["series_column"] ?? null)))) {
                    // line 134
                    echo "                                <option value=\"";
                    echo twig_escape_filter($this->env, $context["idx"], "html", null, true);
                    echo "\" selected=\"selected\">";
                    echo twig_escape_filter($this->env, $context["key"], "html", null, true);
                    echo "</option>
                                ";
                    // line 135
                    $context["selected"] = true;
                    // line 136
                    echo "                            ";
                } else {
                    // line 137
                    echo "                                <option value=\"";
                    echo twig_escape_filter($this->env, $context["idx"], "html", null, true);
                    echo "\">";
                    echo twig_escape_filter($this->env, $context["key"], "html", null, true);
                    echo "</option>
                            ";
                }
                // line 139
                echo "                        ";
            }
            // line 140
            echo "                    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['idx'], $context['key'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 141
        echo "                </select>
            </div>
            ";
        // line 143
        echo PhpMyAdmin\Html\Generator::getStartAndNumberOfRowsPanel(($context["sql_query"] ?? null));
        echo "
            <div class=\"clearfloat\"></div>
            <div id=\"resizer\" style=\"width:600px; height:400px;\">
                <div style=\"position: absolute; right: 10px; top: 10px; cursor: pointer; z-index: 1000;\">
                    <a class=\"disableAjax\" id=\"saveChart\" href=\"#\" download=\"chart.png\">
                        ";
        // line 148
        echo \PhpMyAdmin\Html\Generator::getImage("b_saveimage", _gettext("Save chart as image"));
        echo "
                    </a>
                </div>
                <div id=\"querychart\" dir=\"ltr\">
                </div>
            </div>
        </fieldset>
    </form>
</div>
";
    }

    public function getTemplateName()
    {
        return "table/chart/tbl_chart.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  406 => 148,  398 => 143,  394 => 141,  388 => 140,  385 => 139,  377 => 137,  374 => 136,  372 => 135,  365 => 134,  362 => 133,  359 => 132,  354 => 131,  352 => 130,  348 => 128,  346 => 127,  342 => 125,  336 => 124,  334 => 123,  329 => 121,  326 => 120,  322 => 119,  320 => 118,  315 => 117,  311 => 116,  307 => 114,  305 => 113,  299 => 110,  290 => 104,  287 => 103,  285 => 102,  279 => 99,  276 => 98,  274 => 97,  263 => 93,  257 => 91,  254 => 90,  250 => 89,  241 => 87,  235 => 85,  232 => 84,  227 => 83,  225 => 82,  221 => 80,  215 => 79,  212 => 78,  204 => 76,  196 => 74,  193 => 73,  190 => 72,  186 => 71,  182 => 69,  180 => 68,  175 => 65,  169 => 64,  161 => 62,  153 => 60,  150 => 59,  147 => 58,  144 => 57,  141 => 56,  137 => 55,  132 => 53,  129 => 52,  127 => 51,  121 => 48,  115 => 45,  107 => 40,  100 => 36,  93 => 32,  86 => 28,  79 => 24,  72 => 20,  65 => 16,  58 => 12,  52 => 8,  50 => 7,  44 => 4,  40 => 3,  37 => 2,);
    }

    public function getSourceContext()
    {
        return new Source("", "table/chart/tbl_chart.twig", "E:\\IIS Servers\\smart-canteen\\phpMyAdmin\\templates\\table\\chart\\tbl_chart.twig");
    }
}
