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

/* table/partition/analyze.twig */
class __TwigTemplate_e694ab104a9d6b7c0ed47e1dbdc5b26bd578d7a721be0b36021cb6075a344290 extends \Twig\Template
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
        echo "<div class=\"container-fluid\">
  <h2>";
        // line 2
        echo _gettext("Analyze partition");
        echo "</h2>

  ";
        // line 4
        echo ($context["message"] ?? null);
        echo "

  ";
        // line 6
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["rows"] ?? null));
        foreach ($context['_seq'] as $context["name"] => $context["table"]) {
            // line 7
            echo "    <div class=\"card mb-3\">
      <div class=\"card-header\">";
            // line 8
            echo twig_escape_filter($this->env, $context["name"], "html", null, true);
            echo " (";
            echo twig_escape_filter($this->env, ($context["partition_name"] ?? null), "html", null, true);
            echo ")</div>

      <ul class=\"list-group list-group-flush\">
        ";
            // line 11
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($context["table"]);
            foreach ($context['_seq'] as $context["_key"] => $context["row"]) {
                // line 12
                echo "          <li class=\"list-group-item\">
            ";
                // line 13
                if ((twig_lower_filter($this->env, twig_get_attribute($this->env, $this->source, $context["row"], "Op", [], "any", false, false, false, 13)) != "analyze")) {
                    // line 14
                    echo "              <span class=\"badge badge-secondary\">";
                    echo twig_escape_filter($this->env, twig_title_string_filter($this->env, twig_get_attribute($this->env, $this->source, $context["row"], "Op", [], "any", false, false, false, 14)), "html", null, true);
                    echo "</span>
            ";
                }
                // line 16
                echo "
            ";
                // line 17
                ob_start(function () { return ''; });
                // line 18
                if ((twig_lower_filter($this->env, twig_get_attribute($this->env, $this->source, $context["row"], "Msg_type", [], "any", false, false, false, 18)) == "error")) {
                    // line 19
                    echo "badge-danger";
                } elseif ((twig_lower_filter($this->env, twig_get_attribute($this->env, $this->source,                 // line 20
$context["row"], "Msg_type", [], "any", false, false, false, 20)) == "warning")) {
                    // line 21
                    echo "badge-warning";
                } elseif (((twig_lower_filter($this->env, twig_get_attribute($this->env, $this->source,                 // line 22
$context["row"], "Msg_type", [], "any", false, false, false, 22)) == "info") || (twig_lower_filter($this->env, twig_get_attribute($this->env, $this->source, $context["row"], "Msg_type", [], "any", false, false, false, 22)) == "note"))) {
                    // line 23
                    echo "badge-info";
                } else {
                    // line 25
                    echo "badge-secondary";
                }
                $context["badge_variation"] = ('' === $tmp = ob_get_clean()) ? '' : new Markup($tmp, $this->env->getCharset());
                // line 28
                echo "            <span class=\"badge ";
                echo twig_escape_filter($this->env, ($context["badge_variation"] ?? null), "html", null, true);
                echo "\">";
                echo twig_escape_filter($this->env, twig_title_string_filter($this->env, twig_get_attribute($this->env, $this->source, $context["row"], "Msg_type", [], "any", false, false, false, 28)), "html", null, true);
                echo "</span>

            ";
                // line 30
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["row"], "Msg_text", [], "any", false, false, false, 30), "html", null, true);
                echo "
          </li>
        ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['row'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 33
            echo "      </ul>
    </div>
  ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['name'], $context['table'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 36
        echo "</div>
";
    }

    public function getTemplateName()
    {
        return "table/partition/analyze.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  127 => 36,  119 => 33,  110 => 30,  102 => 28,  98 => 25,  95 => 23,  93 => 22,  91 => 21,  89 => 20,  87 => 19,  85 => 18,  83 => 17,  80 => 16,  74 => 14,  72 => 13,  69 => 12,  65 => 11,  57 => 8,  54 => 7,  50 => 6,  45 => 4,  40 => 2,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "table/partition/analyze.twig", "E:\\IIS Servers\\smart-canteen\\phpMyAdmin\\templates\\table\\partition\\analyze.twig");
    }
}
