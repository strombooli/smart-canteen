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

/* server/binlog/index.twig */
class __TwigTemplate_75de4a1ce2069b01ad1a3c3f33c57d2f0f338951fedbc792aeabd29ce98afcd3 extends \Twig\Template
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
        // line 1
        echo "<h2>
  ";
        // line 2
        echo \PhpMyAdmin\Html\Generator::getImage("s_tbl");
        echo "
  ";
        // line 3
        echo _gettext("Binary log");
        // line 4
        echo "</h2>

<form action=\"";
        // line 6
        echo PhpMyAdmin\Url::getFromRoute("/server/binlog");
        echo "\" method=\"post\">
  ";
        // line 7
        echo PhpMyAdmin\Url::getHiddenInputs(($context["url_params"] ?? null));
        echo "
  <fieldset>
    <legend>
      ";
        // line 10
        echo _gettext("Select binary log to view");
        // line 11
        echo "    </legend>

    ";
        // line 13
        $context["full_size"] = 0;
        // line 14
        echo "    <select name=\"log\">
      ";
        // line 15
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["binary_logs"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["each_log"]) {
            // line 16
            echo "        <option value=\"";
            echo twig_escape_filter($this->env, (($__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4 = $context["each_log"]) && is_array($__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4) || $__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4 instanceof ArrayAccess ? ($__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4["Log_name"] ?? null) : null), "html", null, true);
            echo "\"";
            // line 17
            echo ((((($__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144 = $context["each_log"]) && is_array($__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144) || $__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144 instanceof ArrayAccess ? ($__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144["Log_name"] ?? null) : null) == ($context["log"] ?? null))) ? (" selected") : (""));
            echo ">
          ";
            // line 18
            echo twig_escape_filter($this->env, (($__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b = $context["each_log"]) && is_array($__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b) || $__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b instanceof ArrayAccess ? ($__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b["Log_name"] ?? null) : null), "html", null, true);
            echo "
          ";
            // line 19
            if (twig_get_attribute($this->env, $this->source, $context["each_log"], "File_size", [], "array", true, true, false, 19)) {
                // line 20
                echo "            (";
                echo twig_escape_filter($this->env, twig_join_filter(PhpMyAdmin\Util::formatByteDown((($__internal_68aa442c1d43d3410ea8f958ba9090f3eaa9a76f8de8fc9be4d6c7389ba28002 = $context["each_log"]) && is_array($__internal_68aa442c1d43d3410ea8f958ba9090f3eaa9a76f8de8fc9be4d6c7389ba28002) || $__internal_68aa442c1d43d3410ea8f958ba9090f3eaa9a76f8de8fc9be4d6c7389ba28002 instanceof ArrayAccess ? ($__internal_68aa442c1d43d3410ea8f958ba9090f3eaa9a76f8de8fc9be4d6c7389ba28002["File_size"] ?? null) : null), 3, 2), " "), "html", null, true);
                echo ")
            ";
                // line 21
                $context["full_size"] = (($context["full_size"] ?? null) + (($__internal_d7fc55f1a54b629533d60b43063289db62e68921ee7a5f8de562bd9d4a2b7ad4 = $context["each_log"]) && is_array($__internal_d7fc55f1a54b629533d60b43063289db62e68921ee7a5f8de562bd9d4a2b7ad4) || $__internal_d7fc55f1a54b629533d60b43063289db62e68921ee7a5f8de562bd9d4a2b7ad4 instanceof ArrayAccess ? ($__internal_d7fc55f1a54b629533d60b43063289db62e68921ee7a5f8de562bd9d4a2b7ad4["File_size"] ?? null) : null));
                // line 22
                echo "          ";
            }
            // line 23
            echo "        </option>
      ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['each_log'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 25
        echo "    </select>
    ";
        // line 26
        echo twig_escape_filter($this->env, twig_length_filter($this->env, ($context["binary_logs"] ?? null)), "html", null, true);
        echo "
    ";
        // line 27
        echo _gettext("Files");
        echo ",
    ";
        // line 28
        if ((($context["full_size"] ?? null) > 0)) {
            // line 29
            echo "      ";
            echo twig_escape_filter($this->env, twig_join_filter(PhpMyAdmin\Util::formatByteDown(($context["full_size"] ?? null)), " "), "html", null, true);
            echo "
    ";
        }
        // line 31
        echo "  </fieldset>

  <fieldset class=\"tblFooters\">
    <input class=\"btn btn-primary\" type=\"submit\" value=\"";
        // line 34
        echo _gettext("Go");
        echo "\">
  </fieldset>
</form>

";
        // line 38
        echo ($context["sql_message"] ?? null);
        echo "

<table class=\"pma-table\" id=\"binlogTable\">
  <thead>
    <tr>
      <td colspan=\"6\" class=\"text-center\">
        ";
        // line 44
        if (($context["has_previous"] ?? null)) {
            // line 45
            echo "          ";
            if (($context["has_icons"] ?? null)) {
                // line 46
                echo "            <a href=\"";
                echo PhpMyAdmin\Url::getFromRoute("/server/binlog");
                echo "\" data-post=\"";
                echo PhpMyAdmin\Url::getCommon(($context["previous_params"] ?? null), "");
                echo "\" title=\"";
                // line 47
                echo _pgettext(                "Previous page", "Previous");
                echo "\">
              &laquo;
            </a>
          ";
            } else {
                // line 51
                echo "            <a href=\"";
                echo PhpMyAdmin\Url::getFromRoute("/server/binlog");
                echo "\" data-post=\"";
                echo PhpMyAdmin\Url::getCommon(($context["previous_params"] ?? null), "");
                echo "\">
              ";
                // line 52
                echo _pgettext(                "Previous page", "Previous");
                echo " &laquo;
            </a>
          ";
            }
            // line 55
            echo "          -
        ";
        }
        // line 57
        echo "
        ";
        // line 58
        if (($context["is_full_query"] ?? null)) {
            // line 59
            echo "          <a href=\"";
            echo PhpMyAdmin\Url::getFromRoute("/server/binlog");
            echo "\" data-post=\"";
            echo PhpMyAdmin\Url::getCommon(($context["full_queries_params"] ?? null), "");
            echo "\" title=\"";
            echo _gettext("Truncate shown queries");
            echo "\">
            <img src=\"";
            // line 60
            echo twig_escape_filter($this->env, ($context["image_path"] ?? null), "html", null, true);
            echo "s_partialtext.png\" alt=\"";
            echo _gettext("Truncate shown queries");
            echo "\">
          </a>
        ";
        } else {
            // line 63
            echo "          <a href=\"";
            echo PhpMyAdmin\Url::getFromRoute("/server/binlog");
            echo "\" data-post=\"";
            echo PhpMyAdmin\Url::getCommon(($context["full_queries_params"] ?? null), "");
            echo "\" title=\"";
            echo _gettext("Show full queries");
            echo "\">
            <img src=\"";
            // line 64
            echo twig_escape_filter($this->env, ($context["image_path"] ?? null), "html", null, true);
            echo "s_fulltext.png\" alt=\"";
            echo _gettext("Show full queries");
            echo "\">
          </a>
        ";
        }
        // line 67
        echo "
        ";
        // line 68
        if (($context["has_next"] ?? null)) {
            // line 69
            echo "          -
          ";
            // line 70
            if (($context["has_icons"] ?? null)) {
                // line 71
                echo "            <a href=\"";
                echo PhpMyAdmin\Url::getFromRoute("/server/binlog");
                echo "\" data-post=\"";
                echo PhpMyAdmin\Url::getCommon(($context["next_params"] ?? null), "");
                echo "\" title=\"";
                // line 72
                echo _pgettext(                "Next page", "Next");
                echo "\">
              &raquo;
            </a>
          ";
            } else {
                // line 76
                echo "            <a href=\"";
                echo PhpMyAdmin\Url::getFromRoute("/server/binlog");
                echo "\" data-post=\"";
                echo PhpMyAdmin\Url::getCommon(($context["next_params"] ?? null), "");
                echo "\">
              ";
                // line 77
                echo _pgettext(                "Next page", "Next");
                echo " &raquo;
            </a>
          ";
            }
            // line 80
            echo "        ";
        }
        // line 81
        echo "      </td>
    </tr>
    <tr>
      <th>";
        // line 84
        echo _gettext("Log name");
        echo "</th>
      <th>";
        // line 85
        echo _gettext("Position");
        echo "</th>
      <th>";
        // line 86
        echo _gettext("Event type");
        echo "</th>
      <th>";
        // line 87
        echo _gettext("Server ID");
        echo "</th>
      <th>";
        // line 88
        echo _gettext("Original position");
        echo "</th>
      <th>";
        // line 89
        echo _gettext("Information");
        echo "</th>
    </tr>
  </thead>

  <tbody>
    ";
        // line 94
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["values"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["value"]) {
            // line 95
            echo "      <tr class=\"noclick\">
        <td>";
            // line 96
            echo twig_escape_filter($this->env, (($__internal_01476f8db28655ee4ee02ea2d17dd5a92599be76304f08cd8bc0e05aced30666 = $context["value"]) && is_array($__internal_01476f8db28655ee4ee02ea2d17dd5a92599be76304f08cd8bc0e05aced30666) || $__internal_01476f8db28655ee4ee02ea2d17dd5a92599be76304f08cd8bc0e05aced30666 instanceof ArrayAccess ? ($__internal_01476f8db28655ee4ee02ea2d17dd5a92599be76304f08cd8bc0e05aced30666["Log_name"] ?? null) : null), "html", null, true);
            echo "</td>
        <td class=\"right\">";
            // line 97
            echo twig_escape_filter($this->env, (($__internal_01c35b74bd85735098add188b3f8372ba465b232ab8298cb582c60f493d3c22e = $context["value"]) && is_array($__internal_01c35b74bd85735098add188b3f8372ba465b232ab8298cb582c60f493d3c22e) || $__internal_01c35b74bd85735098add188b3f8372ba465b232ab8298cb582c60f493d3c22e instanceof ArrayAccess ? ($__internal_01c35b74bd85735098add188b3f8372ba465b232ab8298cb582c60f493d3c22e["Pos"] ?? null) : null), "html", null, true);
            echo "</td>
        <td>";
            // line 98
            echo twig_escape_filter($this->env, (($__internal_63ad1f9a2bf4db4af64b010785e9665558fdcac0e8db8b5b413ed986c62dbb52 = $context["value"]) && is_array($__internal_63ad1f9a2bf4db4af64b010785e9665558fdcac0e8db8b5b413ed986c62dbb52) || $__internal_63ad1f9a2bf4db4af64b010785e9665558fdcac0e8db8b5b413ed986c62dbb52 instanceof ArrayAccess ? ($__internal_63ad1f9a2bf4db4af64b010785e9665558fdcac0e8db8b5b413ed986c62dbb52["Event_type"] ?? null) : null), "html", null, true);
            echo "</td>
        <td class=\"right\">";
            // line 99
            echo twig_escape_filter($this->env, (($__internal_f10a4cc339617934220127f034125576ed229e948660ebac906a15846d52f136 = $context["value"]) && is_array($__internal_f10a4cc339617934220127f034125576ed229e948660ebac906a15846d52f136) || $__internal_f10a4cc339617934220127f034125576ed229e948660ebac906a15846d52f136 instanceof ArrayAccess ? ($__internal_f10a4cc339617934220127f034125576ed229e948660ebac906a15846d52f136["Server_id"] ?? null) : null), "html", null, true);
            echo "</td>
        <td class=\"right\">";
            // line 101
            echo twig_escape_filter($this->env, ((twig_get_attribute($this->env, $this->source, $context["value"], "Orig_log_pos", [], "array", true, true, false, 101)) ? ((($__internal_887a873a4dc3cf8bd4f99c487b4c7727999c350cc3a772414714e49a195e4386 = $context["value"]) && is_array($__internal_887a873a4dc3cf8bd4f99c487b4c7727999c350cc3a772414714e49a195e4386) || $__internal_887a873a4dc3cf8bd4f99c487b4c7727999c350cc3a772414714e49a195e4386 instanceof ArrayAccess ? ($__internal_887a873a4dc3cf8bd4f99c487b4c7727999c350cc3a772414714e49a195e4386["Orig_log_pos"] ?? null) : null)) : ((($__internal_d527c24a729d38501d770b40a0d25e1ce8a7f0bff897cc4f8f449ba71fcff3d9 = $context["value"]) && is_array($__internal_d527c24a729d38501d770b40a0d25e1ce8a7f0bff897cc4f8f449ba71fcff3d9) || $__internal_d527c24a729d38501d770b40a0d25e1ce8a7f0bff897cc4f8f449ba71fcff3d9 instanceof ArrayAccess ? ($__internal_d527c24a729d38501d770b40a0d25e1ce8a7f0bff897cc4f8f449ba71fcff3d9["End_log_pos"] ?? null) : null))), "html", null, true);
            // line 102
            echo "</td>
        <td>";
            // line 103
            echo \PhpMyAdmin\Html\Generator::formatSql((($__internal_f6dde3a1020453fdf35e718e94f93ce8eb8803b28cc77a665308e14bbe8572ae = $context["value"]) && is_array($__internal_f6dde3a1020453fdf35e718e94f93ce8eb8803b28cc77a665308e14bbe8572ae) || $__internal_f6dde3a1020453fdf35e718e94f93ce8eb8803b28cc77a665308e14bbe8572ae instanceof ArrayAccess ? ($__internal_f6dde3a1020453fdf35e718e94f93ce8eb8803b28cc77a665308e14bbe8572ae["Info"] ?? null) : null),  !($context["is_full_query"] ?? null));
            echo "</td>
      </tr>
    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['value'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 106
        echo "  </tbody>
</table>
";
    }

    public function getTemplateName()
    {
        return "server/binlog/index.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  329 => 106,  320 => 103,  317 => 102,  315 => 101,  311 => 99,  307 => 98,  303 => 97,  299 => 96,  296 => 95,  292 => 94,  284 => 89,  280 => 88,  276 => 87,  272 => 86,  268 => 85,  264 => 84,  259 => 81,  256 => 80,  250 => 77,  243 => 76,  236 => 72,  230 => 71,  228 => 70,  225 => 69,  223 => 68,  220 => 67,  212 => 64,  203 => 63,  195 => 60,  186 => 59,  184 => 58,  181 => 57,  177 => 55,  171 => 52,  164 => 51,  157 => 47,  151 => 46,  148 => 45,  146 => 44,  137 => 38,  130 => 34,  125 => 31,  119 => 29,  117 => 28,  113 => 27,  109 => 26,  106 => 25,  99 => 23,  96 => 22,  94 => 21,  89 => 20,  87 => 19,  83 => 18,  79 => 17,  75 => 16,  71 => 15,  68 => 14,  66 => 13,  62 => 11,  60 => 10,  54 => 7,  50 => 6,  46 => 4,  44 => 3,  40 => 2,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "server/binlog/index.twig", "E:\\IIS Servers\\smart-canteen\\assets\\phpMyAdmin\\templates\\server\\binlog\\index.twig");
    }
}
